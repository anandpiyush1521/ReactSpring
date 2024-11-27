package com.application.server.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "blogs")
public class Blog {
    @Id
    private String id;

    @Column
    private String title;

    @Column(columnDefinition="TEXT") 
    private String content;

    @Column
    private String bannerPath;

    @Column
    private String imagePath;


    @ElementCollection
    @CollectionTable(name = "blog_sections", joinColumns = @JoinColumn(name = "blog_id"))
    @Column(name = "section")
    private List<String> sections;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}