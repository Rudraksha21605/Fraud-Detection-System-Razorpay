package com.example.demo;

public class TransactionRequest {
    private String userId;
    private double amount;
    private String currency;
    private String ipAddress;
    private String cardFingerprint;

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getCardFingerprint() { return cardFingerprint; }
    public void setCardFingerprint(String cardFingerprint) { this.cardFingerprint = cardFingerprint; }
}