package com.example.demo;

import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class RiskEngine {
    public RiskAssessment assess(TransactionRequest request, long velocityCount, long deviceSharingCount) {
        double score = 0.05;
        List<RiskRule> rules = new ArrayList<>();

        if (velocityCount > 3) {
            double contribution = Math.min(0.35 * (velocityCount / 3.0), 0.55);
            score += contribution;
            rules.add(new RiskRule("VELOCITY", "High checkout velocity", round(contribution),
                    velocityCount + " transactions detected in the last 60 seconds."));
        }
        if (deviceSharingCount > 1) {
            score += 0.40;
            rules.add(new RiskRule("DEVICE_SHARING", "Shared card/device fingerprint", 0.40,
                    deviceSharingCount + " distinct accounts use this fingerprint."));
        }
        if (request.getAmount() > 150000) {
            score += 0.25;
            rules.add(new RiskRule("HIGH_VALUE", "High-value transaction", 0.25,
                    "Transaction amount is above the ₹150,000 review threshold."));
        }

        score = Math.min(round(score), 1.0);
        String recommendation;
        String reason;
        if (score >= 0.75) {
            recommendation = "BLOCK";
            reason = "Multiple high-risk signals crossed the automated mitigation threshold.";
        } else if (score >= 0.40) {
            recommendation = "CHALLENGE";
            reason = "Anomalous behavior requires additional customer verification.";
        } else {
            recommendation = "APPROVE";
            reason = "Observed transaction behavior remains within the normal risk baseline.";
        }
        return new RiskAssessment(score, recommendation, reason, rules);
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
