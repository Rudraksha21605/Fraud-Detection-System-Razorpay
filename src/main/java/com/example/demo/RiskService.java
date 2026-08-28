package com.example.demo;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class RiskService {

    private final TransactionRiskRepository repository;

    public RiskService(TransactionRiskRepository repository) {
        this.repository = repository;
    }

    public Map<String, Object> evaluateRisk(TransactionRequest request) {
        // 1. Instantly log this transaction attempt into the H2 Engine to capture real-time telemetry
        Transaction currentTx = new Transaction(
            request.getUserId(),
            request.getAmount(),
            request.getIpAddress(),
            request.getCardFingerprint(),
            LocalDateTime.now()
        );
        repository.save(currentTx);

        // 2. Query historical sliding windows directly from your database
        
        LocalDateTime sixtySecondsAgo = LocalDateTime.now().minusMinutes(1);
        long velocityCount = repository.countRecentTransactions(request.getUserId(), sixtySecondsAgo);
        long deviceSharingCount = repository.countDistinctUsersOnDevice(request.getCardFingerprint());

        // 3. Statistical Risk Model Weights
        double riskScore = 0.05; // Trusted profile base score

        // Vector A: High Checkout Velocity (Classic Carding Bot signature)
        if (velocityCount > 3) {
            riskScore += 0.35 * (velocityCount / 3.0);
        }

        // Vector B: Account Takeover Fingerprinting (Multiple users multiplexed on one device ID)
        if (deviceSharingCount > 1) {
            riskScore += 0.40;
        }

        // Vector C: Anomalous High Ticket Volume Check
        if (request.getAmount() > 150000) {
            riskScore += 0.25;
        }

        // Keep the floating point safely bounded between 0.0 and 1.0
        riskScore = Math.min(riskScore, 1.0);

        // 4. Determine Razorpay Workflow Enforcement Verdicts
        String recommendation;
        String actionReason;

        if (riskScore >= 0.75) {
            recommendation = "BLOCK";
            actionReason = "Velocity threshold breached. Automated transaction mitigation protocol engaged.";
        } else if (riskScore >= 0.40) {
            recommendation = "CHALLENGE";
            actionReason = "Anomalous patterns flagged. Requiring multi-factor authentication pass.";
        } else {
            recommendation = "APPROVE";
            actionReason = "Risk metrics within standard operational baseline profiles.";
        }

        Map<String, Object> analyticalOutput = new HashMap<>();
        analyticalOutput.put("userId", request.getUserId());
        analyticalOutput.put("riskScore", Math.round(riskScore * 100.0) / 100.0);
        analyticalOutput.put("recommendation", recommendation);
        analyticalOutput.put("reason", actionReason);
        
        // Return metrics proof to show judges your calculations are working dynamically
        analyticalOutput.put("liveTelemetry", Map.of(
            "velocityLastMinute", velocityCount,
            "distinctAccountsOnDevice", deviceSharingCount
        ));

        return analyticalOutput;
    }
}