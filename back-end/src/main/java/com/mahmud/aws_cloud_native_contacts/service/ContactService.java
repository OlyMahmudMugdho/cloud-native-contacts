package com.mahmud.aws_cloud_native_contacts.service;

import com.mahmud.aws_cloud_native_contacts.dto.ContactDTO;
import com.mahmud.aws_cloud_native_contacts.entity.Contact;
import com.mahmud.aws_cloud_native_contacts.entity.User;
import com.mahmud.aws_cloud_native_contacts.repository.ContactRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ezvcard.Ezvcard;
import ezvcard.VCard;
import ezvcard.VCardVersion;
import ezvcard.property.StructuredName;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    private final UserService userService;

    public Page<ContactDTO> getAllContacts(Pageable pageable) {
        User currentUser = userService.getCurrentUserEntity();
        System.out.println(currentUser.getUsername());
        return contactRepository.findByUser(currentUser, pageable)
                .map(this::mapToDTO);
    }

    public ContactDTO getContact(Long id) {
        User currentUser = userService.getCurrentUserEntity();
        return contactRepository.findByIdAndUser(id, currentUser)
                .map(this::mapToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found"));
    }

    @Transactional
    public ContactDTO createContact(ContactDTO contactDTO) {
        User currentUser = userService.getCurrentUserEntity();
        
        Contact contact = Contact.builder()
                .name(contactDTO.getName())
                .phoneNumber(contactDTO.getPhoneNumber())
                .email(contactDTO.getEmail())
                .description(contactDTO.getDescription())
                .address(contactDTO.getAddress())
                .photoUrl(contactDTO.getPhotoUrl())
                .user(currentUser)
                .build();
        
        return mapToDTO(contactRepository.save(contact));
    }

    @Transactional
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        User currentUser = userService.getCurrentUserEntity();
        Contact contact = contactRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found"));
        
        contact.setName(contactDTO.getName());
        contact.setPhoneNumber(contactDTO.getPhoneNumber());
        contact.setEmail(contactDTO.getEmail());
        contact.setDescription(contactDTO.getDescription());
        contact.setAddress(contactDTO.getAddress());
        
        if (contactDTO.getPhotoUrl() != null) {
            contact.setPhotoUrl(contactDTO.getPhotoUrl());
        }
        
        return mapToDTO(contactRepository.save(contact));
    }

    @Transactional
    public void deleteContact(Long id) {
        User currentUser = userService.getCurrentUserEntity();
        contactRepository.deleteByIdAndUser(id, currentUser);
    }

    @Transactional
    public String updateContactPhoto(Long id, MultipartFile file) throws IOException {
        User currentUser = userService.getCurrentUserEntity();
        Contact contact = contactRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found"));
        
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get("uploads");
        
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        Files.copy(file.getInputStream(), uploadPath.resolve(fileName));
        
        String photoUrl = "/uploads/" + fileName;
        contact.setPhotoUrl(photoUrl);
        contactRepository.save(contact);
        
        return photoUrl;
    }

    public byte[] exportContactsToVcf() {
        User currentUser = userService.getCurrentUserEntity();
        List<Contact> contacts = contactRepository.findByUser(currentUser);
        
        List<VCard> vCards = contacts.stream().map(contact -> {
            VCard vCard = new VCard();
            
            // Set full name
            vCard.setFormattedName(contact.getName());
            
            // Set structured name (split into parts if possible)
            String[] nameParts = contact.getName().split(" ", 2);
            StructuredName n = new StructuredName();
            if (nameParts.length > 1) {
                n.setGiven(nameParts[0]);
                n.setFamily(nameParts[1]);
            } else {
                n.setGiven(contact.getName());
            }
            vCard.setStructuredName(n);
            
            // Set phone number with type CELL
            ezvcard.property.Telephone tel = new ezvcard.property.Telephone(contact.getPhoneNumber());
            tel.getTypes().add(ezvcard.parameter.TelephoneType.CELL);
            vCard.addTelephoneNumber(tel);
            
            // Set email if available
            if (contact.getEmail() != null && !contact.getEmail().isEmpty()) {
                vCard.addEmail(contact.getEmail());
            }
            
            // Set address if available
            if (contact.getAddress() != null && !contact.getAddress().isEmpty()) {
                ezvcard.property.Address address = new ezvcard.property.Address();
                address.setLabel(contact.getAddress());
                address.setStreetAddress(contact.getAddress());
                vCard.addAddress(address);
            }
            
            // Set note/description if available
            if (contact.getDescription() != null && !contact.getDescription().isEmpty()) {
                vCard.addNote(contact.getDescription());
            }
            
            return vCard;
        }).toList();
        
        // Write all vCards to a string using version 3.0 (more widely supported)
        return Ezvcard.write(vCards)
                .version(VCardVersion.V3_0)
                .caretEncoding(true)  // Use ^ encoding for special characters
                .go()
                .getBytes();
    }

    @Transactional
    public void importContactsFromVcf(MultipartFile file) throws IOException {
        User currentUser = userService.getCurrentUserEntity();
        List<VCard> vCards = Ezvcard.parse(file.getInputStream()).all();
        
        for (VCard vCard : vCards) {
            // Get name from FormattedName or StructuredName
            String name;
            if (vCard.getFormattedName() != null) {
                name = vCard.getFormattedName().getValue();
            } else if (vCard.getStructuredName() != null) {
                StructuredName sn = vCard.getStructuredName();
                name = String.join(" ", 
                    sn.getGiven() != null ? sn.getGiven() : "",
                    sn.getFamily() != null ? sn.getFamily() : ""
                ).trim();
            } else {
                // Skip if no name is available
                continue;
            }
            
            // Get first phone number
            String phoneNumber = null;
            if (!vCard.getTelephoneNumbers().isEmpty()) {
                phoneNumber = vCard.getTelephoneNumbers().get(0).getText();
            }
            
            // Skip if no phone number is available
            if (phoneNumber == null || phoneNumber.isEmpty()) {
                continue;
            }
            
            // Get first email
            String email = null;
            if (!vCard.getEmails().isEmpty()) {
                email = vCard.getEmails().get(0).getValue();
            }
            
            // Get first address
            String address = null;
            if (!vCard.getAddresses().isEmpty()) {
                ezvcard.property.Address addr = vCard.getAddresses().get(0);
                if (addr.getLabel() != null) {
                    address = addr.getLabel();
                } else if (addr.getStreetAddress() != null) {
                    address = addr.getStreetAddress();
                }
            }
            
            // Get first note as description
            String description = null;
            if (!vCard.getNotes().isEmpty()) {
                description = vCard.getNotes().get(0).getValue();
            }
            
            // Create and save the contact
            Contact contact = Contact.builder()
                    .name(name)
                    .phoneNumber(phoneNumber)
                    .email(email)
                    .address(address)
                    .description(description)
                    .user(currentUser)
                    .build();
            
            contactRepository.save(contact);
        }
    }

    private ContactDTO mapToDTO(Contact contact) {
        return ContactDTO.builder()
                .id(contact.getId())
                .name(contact.getName())
                .phoneNumber(contact.getPhoneNumber())
                .email(contact.getEmail())
                .description(contact.getDescription())
                .address(contact.getAddress())
                .photoUrl(contact.getPhotoUrl())
                .build();
    }
} 