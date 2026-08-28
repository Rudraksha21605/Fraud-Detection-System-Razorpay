# Real-Time Payments Fraud Detection Engine (Razorpay Builderthon)

An enterprise-grade transaction risk scoring and fraud mitigation subsystem designed to detect and block high-velocity card/device hijacking attacks in under 100ms.

## 🚀 Key Architectural Features
- **Velocity Tracking Engine:** Employs optimized sliding-window database aggregates via JPQL to track high-frequency transaction bursts.
- **Fingerprint Cross-Matching:** Uses `cardFingerprint` and `deviceFingerprint` cardinality checks to detect multi-accounting and account takeover (ATO) patterns.
- **Automated Mitigation:** Dynamically transitions operational state guidelines from `APPROVE` to `BLOCK` upon threat threshold violations.

## 🛠️ Tech Stack
- **Backend:** Java 17, Spring Boot, Spring Data JPA
- **Database:** In-Memory H2 Engine (Simulating low-latency indexing context)
- **API Architecture:** RESTful Pattern with strict DTO-driven request scoping

## 📊 Live Verification Test Scenario
When firing immediate subsequent payloads for a target asset `safe_user_101`, the system transitions dynamically:
1. **Initial Profile:** Score `0.05` -> `APPROVE` (Baseline operational profile)
2. **Breach Execution:** Score `0.98` -> `BLOCK` (Velocity Threshold Breached)

## 💻 How to Run & Verify Locally
1. Start the application using your IDE or terminal: `.\mvnw spring-boot:run`
2. Fire a standard transaction payload to: `POST http://localhost:8080/api/v1/risk/assess`