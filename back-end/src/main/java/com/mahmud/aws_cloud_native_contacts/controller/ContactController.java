package com.mahmud.aws_cloud_native_contacts.controller;

import com.mahmud.aws_cloud_native_contacts.dto.ContactDTO;
import com.mahmud.aws_cloud_native_contacts.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<Page<ContactDTO>> getAllContacts(Pageable pageable) {
        return ResponseEntity.ok(contactService.getAllContacts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDTO> getContact(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContact(id));
    }

    @PostMapping
    public ResponseEntity<ContactDTO> createContact(@Valid @RequestBody ContactDTO contactDTO) {
        return ResponseEntity.ok(contactService.createContact(contactDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactDTO> updateContact(
            @PathVariable Long id,
            @Valid @RequestBody ContactDTO contactDTO) {
        return ResponseEntity.ok(contactService.updateContact(id, contactDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/export/vcf", produces = "text/x-vcard;charset=UTF-8")
    public ResponseEntity<byte[]> exportContactsToVcf() {
        byte[] vcfData = contactService.exportContactsToVcf();
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"contacts.vcf\"")
                .header("Content-Type", "text/x-vcard; charset=UTF-8")
                .contentLength(vcfData.length)
                .body(vcfData);
    }

    @PutMapping(value = "/{id}/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateContactPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        String photoUrl = contactService.updateContactPhoto(id, file);
        return ResponseEntity.ok(photoUrl);
    }

    @PostMapping(value = "/import/vcf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> importContactsFromVcf(@RequestParam("file") MultipartFile file) throws IOException {
        contactService.importContactsFromVcf(file);
        return ResponseEntity.ok().build();
    }
} 