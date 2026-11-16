# soulinspire-web-app
Building the AWS infrastructure foundation that allows a simple web app to be hosted, delivered, monitored, protected, and cost-controlled.
# Soulinspire AWS Infrastructure Build

## Architecture Overview

Soulinspire uses a secure AWS web delivery architecture. The frontend is hosted in a private Amazon S3 bucket and delivered to users through Amazon CloudFront. A backend test service runs on Amazon EC2.

## Frontend Layer

The frontend is built with HTML, CSS, JavaScript, and image assets. Upload the finished files to an Amazon S3 bucket. Keep the bucket private so users cannot access it directly.

## Content Delivery Layer

Amazon CloudFront delivers the frontend website. Configure an Origin Access Control (OAC) so CloudFront can securely read objects from the private S3 bucket. Users access the website through the CloudFront distribution URL.

## Backend Layer

The backend test service runs on an Amazon Linux EC2 instance in a VPC public subnet. Install Nginx to serve a simple backend response, and protect the instance with appropriately scoped security group rules.

## Database Layer

A database is not required for the core architecture. If the application later needs to store user records, form submissions, or dynamic content, Amazon RDS can be added in private subnets.

## Request Flow and Operations

1. The user opens the CloudFront distribution URL.
2. CloudFront serves the frontend from the private S3 bucket using OAC.
3. Optional backend requests can be routed to the EC2 instance running Amazon Linux and Nginx.
4. CloudWatch monitors EC2 metrics and logs.
5. CloudWatch alarms send alerts through Amazon SNS.
6. AWS Data Lifecycle Manager (DLM) creates EBS snapshots for backup.
7. AWS Budgets monitors project costs.
