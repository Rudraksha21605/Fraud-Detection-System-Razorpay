package com.example.demo;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class RiskService {
    private final TransactionRiskRepository repository;
    private final RiskEngine riskEngine;

    public RiskService(TransactionRiskRepository repository, RiskEngine riskEngine) {
        this.repository = repository;
        this.riskEngine = riskEngine;
    }

    public Map<String, Object> evaluateRisk(TransactionRequest request) {
        validate(request);

        LocalDateTime now = LocalDateTime.now();
        repository.save(new Transaction(
                request.getUserId(), request.getAmount(), request.getIpAddress(),
                request.getCardFingerprint(), now));

        long velocityCount = repository.countRecentTransactions(
                request.getUserId(), now.minusSeconds(60));
        long deviceSharingCount = repository.countDistinctUsersOnDevice(
                request.getCardFingerprint());

        RiskAssessment assessment = riskEngine.assess(request, velocityCount, deviceSharingCount);

        Map<String, Object> response = new HashMap<>();
        response.put("userId", request.getUserId());
        response.put("riskScore", assessment.riskScore());
        response.put("recommendation", assessment.recommendation());
        response.put("reason", assessment.reason());
        response.put("rules", assessment.rules());
        response.put("liveTelemetry", Map.of(
                "velocityLastMinute", velocityCount,
                "distinctAccountsOnDevice", deviceSharingCount
        ));
        return response;
    }

    private void validate(TransactionRequest request) {
        if (request == null) throw new IllegalArgumentException("Request body is required.");
        if (request.getUserId() == null || request.getUserId().isBlank())
            throw new IllegalArgumentException("userId is required.");
        if (request.getAmount() < 0)
            throw new IllegalArgumentException("amount must be non-negative.");
        if (request.getIpAddress() == null || request.getIpAddress().isBlank())
            throw new IllegalArgumentException("ipAddress is required.");
        if (request.getCardFingerprint() == null || request.getCardFingerprint().isBlank())
            throw new IllegalArgumentException("cardFingerprint is required.");
    }
}
