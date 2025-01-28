package com.mahmud.aws_cloud_native_contacts.repository;

import com.mahmud.aws_cloud_native_contacts.entity.Contact;
import com.mahmud.aws_cloud_native_contacts.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    Page<Contact> findByUser(User user, Pageable pageable);
    Optional<Contact> findByIdAndUser(Long id, User user);
    void deleteByIdAndUser(Long id, User user);
} 