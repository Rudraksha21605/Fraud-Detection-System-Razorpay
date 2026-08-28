package com.example.demo;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;
    private double amount;
    private String ipAddress;
    private String cardFingerprint;
    private LocalDateTime timestamp;

    public Transaction() {}

    public Transaction(String userId, double amount, String ipAddress, String cardFingerprint, LocalDateTime timestamp) {
        this.userId = userId;
        this.amount = amount;
        this.ipAddress = ipAddress;
        this.cardFingerprint = cardFingerprint;
        this.timestamp = timestamp;
    }

    // Getters and Setters required for Spring Data compilation
    public Long getId() { return id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getCardFingerprint() { return cardFingerprint; }
    public void setCardFingerprint(String cardFingerprint) { this.cardFingerprint = cardFingerprint; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}