# RazorGuard — Fraud Detection & Risk Intelligence

RazorGuard is a component-based payment fraud detection platform built for the Razorpay Builderthon. It evaluates a transaction in real time and returns an explainable **APPROVE**, **CHALLENGE**, or **BLOCK** decision.

## Architecture

```
React + TypeScript
       |
       v
Reusable UI Components
       |
       v
Spring Boot REST API
       |
       +--> RiskService
       |       |
       |       +--> RiskEngine
       |       |      +--> Velocity rule
       |       |      +--> Device sharing rule
       |       |      +--> High-value rule
       |       |
       |       +--> TransactionRiskRepository
       |
       v
H2 Database
```

## Key components

### Frontend
- `Header` — navigation and product identity
- `MetricCard` — reusable risk metric cards
- `RiskAssessmentForm` — transaction input and demo scenarios
- `RiskResult` — decision, score, explanation, triggered rules and telemetry
- `types.ts` — shared TypeScript contracts

### Backend
- `RiskController` — REST API boundary
- `RiskService` — validation, persistence and orchestration
- `RiskEngine` — isolated fraud scoring rules
- `RiskRule` — explainable rule contribution model
- `RiskAssessment` — immutable risk decision model
- `TransactionRiskRepository` — database queries

## Detection model

The current engine intentionally uses transparent rules so a judge can understand every decision:

| Signal | Trigger | Contribution |
|---|---|---:|
| Checkout velocity | More than 3 transactions in 60 seconds | Up to 55% |
| Device/account sharing | Fingerprint used by multiple accounts | 40% |
| High-value payment | Amount above ₹150,000 | 25% |
| Baseline | Every transaction starts from a low-risk baseline | 5% |

Decision thresholds:
- **0–39%:** APPROVE
- **40–74%:** CHALLENGE
- **75–100%:** BLOCK

## API

### Assess transaction

`POST /api/v1/risk/assess`

Example request:

```json
{
  "userId": "user_1024",
  "amount": 2500,
  "currency": "INR",
  "ipAddress": "103.21.44.18",
  "cardFingerprint": "fp_demo_001"
}
```

### Health

`GET /api/v1/risk/health`

Returns the engine status.

## Run locally

### Backend

Requirements: Java 17+ and Maven.

```bash
mvn clean test
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

### Frontend

Requirements: Node.js 18+.

```bash
npm install
npm run build
npm run dev
```

Frontend runs on the Vite development URL, normally `http://localhost:5173`.

For a different backend URL:

```bash
VITE_API_URL=http://localhost:8080/api/v1/risk/assess npm run dev
```

## Builderthon demo flow

1. Start the Spring Boot backend.
2. Start the React frontend.
3. Click **Normal** to demonstrate an approve path.
4. Click **High value** to demonstrate an elevated risk signal.
5. Submit the same fingerprint with multiple user IDs to demonstrate device-sharing detection.
6. Rapidly submit the same user several times to demonstrate velocity detection.
7. Show the **Triggered Signals** section to explain exactly why the decision changed.

## Why this architecture

The project separates presentation, orchestration, scoring and persistence. That makes new fraud rules easy to add without rewriting the API or UI. Each risk decision also exposes the signals that contributed to the score, making the system easier to debug, demonstrate and extend.

## Tech stack

- React 19 + TypeScript
- Vite
- Lucide React
- Spring Boot
- Spring Data JPA
- H2
- Maven
- Java 17

- ## Dashboard

![RazorGuard Dashboard](dashboard.png)
