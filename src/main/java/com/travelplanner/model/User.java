package com.travelplanner.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FIX 1: Explicitly force mapping to match your MySQL column name database structure
    @Column(name = "full_name", nullable = false)
    @JsonProperty("fullName") // Guarantees React reads "fullName" property keys accurately
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    // FIX 2: Added the missing administration privilege tier category property field string
    @Column(name = "role")
    @JsonProperty("role") // Maps "USER" or "ADMIN" tokens over your network API layer
    private String role;

    public User() {
    }

    // Updated constructor block containing the custom admin tracking configurations
    public User(Long id, String fullName, String email, String password, String role) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // FIX 3: Added getter and setter methods for the brand new role tracking column context
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
