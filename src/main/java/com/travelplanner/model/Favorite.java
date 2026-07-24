package com.travelplanner.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

@Entity
@Table(name = "favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    @JsonProperty("userId")
    private Long userId;

    @Column(name = "item_id")
    @JsonProperty("itemId")
    private Long itemId;

    @Column(name = "item_type")
    @JsonProperty("itemType")
    private String itemType;

    @Column(name = "place_name")
    @JsonProperty("placeName")
    private String placeName;

    @Column(name = "image_url")
    @JsonProperty("imageUrl")
    private String imageUrl;

    private String category;
    private String description;

    @Column(name = "created_at")
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    public Favorite() {}

    public Favorite(Long id, Long userId, Long itemId, String itemType, String placeName,
                     String imageUrl, String category, String description) {
        this.id = id;
        this.userId = userId;
        this.itemId = itemId;
        this.itemType = itemType;
        this.placeName = placeName;
        this.imageUrl = imageUrl;
        this.category = category;
        this.description = description;
    }

    // Automatically fills created_at right before the row is inserted —
    // no frontend or service code needs to worry about it
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }
    public String getPlaceName() { return placeName; }
    public void setPlaceName(String placeName) { this.placeName = placeName; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}