# Soulinspire Retail Application on AWS

Building the AWS infrastructure foundation that allows a simple retail web application to be hosted, delivered, monitored, protected, and cost-controlled.

The Soulinspire Retail Application is a cloud-hosted retail web application built with HTML, CSS, JavaScript, and static assets. The frontend is hosted in a private Amazon S3 bucket and securely delivered to users through Amazon CloudFront using Origin Access Control.

The backend test server runs on one Amazon EC2 instance using Amazon Linux 2023 with a t3.micro instance type. The backend environment supports Apache HTTP Server on port 80 and Node.js on port 4000.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
   - [High-Level Architecture](#high-level-architecture)
3. [AWS Architecture Diagram](#aws-architecture-diagram)
4. [Work Structure](#work-structure)
   - [Phase 1: Requirement Review](#phase-1-requirement-review)
   - [Phase 2: Architecture Planning](#phase-2-architecture-planning)
   - [Phase 3: Frontend Preparation](#phase-3-frontend-preparation)
   - [Phase 4: S3 Frontend Hosting](#phase-4-s3-frontend-hosting)
   - [Phase 5: CloudFront Configuration](#phase-5-cloudfront-configuration)
   - [Phase 6: EC2 Backend Server Deployment](#phase-6-ec2-backend-server-deployment)
   - [Phase 7: Monitoring and Notification](#phase-7-monitoring-and-notification)
   - [Phase 8: Testing and Troubleshooting](#phase-8-testing-and-troubleshooting)
5. [Technologies Used](#technologies-used)
6. [AWS Services Used](#aws-services-used)
7. [Application Folder Structure](#application-folder-structure)
8. [Prerequisites](#prerequisites)
9. [VPC and Networking Design](#vpc-and-networking-design)
   - [VPC Components](#vpc-components)
   - [VPC Setup Steps](#vpc-setup-steps)
   - [Screenshots: VPC and Networking](#screenshots-vpc-and-networking)
10. [IAM Configuration](#iam-configuration)
    - [IAM Purpose](#iam-purpose)
    - [IAM Best Practices Used](#iam-best-practices-used)
    - [Screenshot Space: IAM](#screenshot-space-iam)
11. [EC2 Backend Server](#ec2-backend-server)
    - [EC2 Configuration](#ec2-configuration)
    - [EC2 Deployment Steps](#ec2-deployment-steps)
    - [Screenshot Space: EC2 Instance](#screenshot-space-ec2-instance)
12. [Amazon Linux 2023 Terminal Login Session](#amazon-linux-2023-terminal-login-session)
    - [SSH Login Command](#ssh-login-command)
    - [Expected Login Session](#expected-login-session)
    - [Confirm the Operating System](#confirm-the-operating-system)
    - [Screenshot Space: Amazon Linux Login](#screenshot-space-amazon-linux-login)
13. [Apache HTTP Server Configuration](#apache-http-server-configuration)
    - [Install Apache](#install-apache)
    - [Start and Enable Apache](#start-and-enable-apache)
    - [Check Apache Status](#check-apache-status)
    - [Create an Apache Test Page](#create-an-apache-test-page)
    - [Test Apache Locally](#test-apache-locally)
    - [Test Apache from a Browser](#test-apache-from-a-browser)
    - [Screenshot Space: Apache Running](#screenshot-space-apache-running)
14. [Node.js Backend Service on Port 4000](#nodejs-backend-service-on-port-4000)
    - [Install Node.js](#install-nodejs)
    - [Confirm Node.js Installation](#confirm-nodejs-installation)
    - [Create Backend Application Directory](#create-backend-application-directory)
    - [Create Node.js Server File](#create-nodejs-server-file)
    - [Start Node.js Backend](#start-nodejs-backend)
    - [Test Node.js Locally](#test-nodejs-locally)
    - [Run Node.js in the Background](#run-nodejs-in-the-background)
    - [Screenshot Space: Node.js Running](#screenshot-space-nodejs-running)
15. [Amazon S3 Private Frontend Hosting](#amazon-s3-private-frontend-hosting)
    - [S3 Hosting Configuration](#s3-hosting-configuration)
    - [Files Uploaded to S3](#files-uploaded-to-s3)
    - [S3 Setup Steps](#s3-setup-steps)
    - [Screenshots: S3](#screenshots-s3)
16. [CloudFront Distribution with OAC](#cloudfront-distribution-with-oac)
    - [CloudFront Configuration](#cloudfront-configuration)
    - [CloudFront Setup Steps](#cloudfront-setup-steps)
    - [Example CloudFront URL Format](#example-cloudfront-url-format)
    - [Screenshots: CloudFront](#screenshots-cloudfront)
17. [Security Group Configuration](#security-group-configuration)
    - [Recommended Inbound Rules](#recommended-inbound-rules)
    - [Recommended Outbound Rules](#recommended-outbound-rules)
    - [Security Note](#security-note)
    - [Screenshot Space: Security Group](#screenshot-space-security-group)
18. [CloudWatch Monitoring](#cloudwatch-monitoring)
    - [CloudWatch Monitoring Scope](#cloudwatch-monitoring-scope)
    - [Example CloudWatch Alarms](#example-cloudwatch-alarms)
    - [Screenshots: CloudWatch](#screenshots-cloudwatch)
19. [SNS Notification Service](#sns-notification-service)
    - [SNS Purpose](#sns-purpose)
    - [SNS Setup Steps](#sns-setup-steps)
    - [Screenshot Space: SNS Topic](#screenshot-space-sns-topic)
20. [Request Flow and Operations](#request-flow-and-operations)
21. [Screenshots Evidence Section](#screenshots-evidence-section)
    - [Screenshot Checklist](#screenshot-checklist)
22. [Testing the Deployment](#testing-the-deployment)
    - [Test Apache on EC2](#test-apache-on-ec2)
    - [Test Node.js on EC2](#test-nodejs-on-ec2)
    - [Test CloudFront Frontend](#test-cloudfront-frontend)
    - [Test S3 Privacy](#test-s3-privacy)
23. [Troubleshooting](#troubleshooting)
    - [Issue: Frontend Did Not Load Through CloudFront](#issue-frontend-did-not-load-through-cloudfront)
    - [Common Issues and Fixes](#common-issues-and-fixes)
    - [Optional CloudFront Cache Invalidation Command](#optional-cloudfront-cache-invalidation-command)
24. [Recommendations](#recommendations)
    - [Security Recommendations](#security-recommendations)
    - [Networking Recommendations](#networking-recommendations)
    - [Monitoring Recommendations](#monitoring-recommendations)
    - [Cost Recommendations](#cost-recommendations)
    - [Production Recommendations](#production-recommendations)
25. [Future Improvements](#future-improvements)
26. [Conclusion](#conclusion)
27. [Related AWS Documentation](#related-aws-documentation)
28. [Project Status](#project-status)
29. [License](#license)

---

## Project Overview

The purpose of this project is to build a secure AWS infrastructure environment for hosting and delivering the Soulinspire Retail Application.

The application is designed as a simple web application with a static frontend and a backend test server.

The frontend is built with:

- HTML
- CSS
- JavaScript
- Static assets such as images, icons, and logos

The frontend is uploaded to an Amazon S3 bucket. The S3 bucket is kept private and is not directly exposed to the public internet.

The application is delivered to users through Amazon CloudFront. CloudFront uses Origin Access Control to securely access the private S3 bucket.

The backend server is hosted on Amazon EC2 using:

- Amazon Linux 2023
- t3.micro instance type
- Apache HTTP Server on port 80
- Node.js backend service on port 4000

Monitoring and alerting are handled using:

- Amazon CloudWatch
- Amazon SNS

[Back to top](#table-of-contents)

---

## Architecture Overview

Soulinspire uses a secure AWS web delivery architecture.

The frontend layer is stored in a private Amazon S3 bucket. Users do not access the S3 bucket directly. Instead, users access the application through the CloudFront distribution domain name.

CloudFront retrieves files from the private S3 bucket using Origin Access Control.

The backend test service runs on an EC2 instance inside a VPC public subnet. The EC2 instance uses Amazon Linux 2023 and is protected by a Security Group.

A private subnet is also included in the network design for future backend workloads, database services, or internal application components.

### High-Level Architecture

```text
User Browser
    |
    | HTTPS request
    v
Amazon CloudFront
    |
    | Secure origin access using OAC
    v
Private Amazon S3 Bucket
    |
    | Stores static frontend files
    v
HTML, CSS, JavaScript, Assets
```

Backend Layer:

```text
User/Admin
    |
    | SSH / HTTP / Backend test access
    v
EC2 Instance in Public Subnet
    |
    | Amazon Linux 2023
    | Apache HTTP Server: Port 80
    | Node.js Service: Port 4000
```

[Back to top](#table-of-contents)

---

## AWS Architecture Diagram

Paste the Soulinspire Retail Application AWS architectural design in this section.

Recommended image location:

```text
```

Markdown image format:

```markdown
![Soulinspire AWS Architecture](docs/screenshots/soulinspire-aws-architecture.png)
```

**Architecture Diagram Space**

<img width="474" height="332" alt="soulinspire diagram" src="https://github.com/user-attachments/assets/9d659b87-e2b6-4109-95dd-59f1fc85ea3a" />

[Back to top](#table-of-contents)

---

## Work Structure

The project was completed in structured phases.

### Phase 1: Requirement Review

Reviewed the project goal:

- Host a simple retail web application.
- Keep the frontend storage private.
- Deliver the frontend securely through CloudFront.
- Create a backend test server on EC2.
- Monitor the environment.
- Send alerts using SNS.
- Document the deployment for GitHub.

### Phase 2: Architecture Planning

Designed the AWS architecture using:

- VPC
- Public subnet
- Private subnet
- Internet Gateway
- Route table
- Security Group
- IAM
- EC2
- S3
- CloudFront
- OAC
- CloudWatch
- SNS

### Phase 3: Frontend Preparation

Prepared the static web application files:

- index.html
- CSS files
- JavaScript files
- Image and icon assets

### Phase 4: S3 Frontend Hosting

Configured Amazon S3 to store the frontend files.

The bucket was kept private to prevent direct public access.

### Phase 5: CloudFront Configuration

Configured CloudFront to deliver the frontend application securely using Origin Access Control.

### Phase 6: EC2 Backend Server Deployment

Created one EC2 instance using:

- Amazon Linux 2023
- t3.micro instance type
- Apache HTTP Server
- Node.js backend service

### Phase 7: Monitoring and Notification

Used CloudWatch and SNS for monitoring and alerting.

### Phase 8: Testing and Troubleshooting

Tested the CloudFront distribution domain name.

The frontend initially failed to load because index.html was not entered as the default root object during CloudFront configuration.

The issue was resolved by setting the CloudFront default root object to:

```text
index.html
```

[Back to top](#table-of-contents)

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Defines the frontend page structure |
| CSS | Styles the frontend interface |
| JavaScript | Adds frontend interactivity |
| Assets | Stores images, icons, and other static files |
| Apache HTTP Server | Serves HTTP traffic on port 80 |
| Node.js | Runs backend test service on port 4000 |
| Amazon Linux 2023 | Operating system for the EC2 backend server |

[Back to top](#table-of-contents)

---

## AWS Services Used

| AWS Service | Purpose |
|---|---|
| Amazon VPC | Provides isolated cloud networking |
| Public Subnet | Hosts the EC2 backend server |
| Private Subnet | Reserved for future database or private workloads |
| Internet Gateway | Allows internet access for public subnet resources |
| Route Table | Controls traffic routing within the VPC |
| Security Group | Controls inbound and outbound EC2 traffic |
| IAM | Manages permissions and secure access |
| Amazon EC2 | Hosts the backend server |
| Amazon S3 | Stores frontend static files privately |
| CloudFront | Delivers frontend content to users |
| Origin Access Control | Allows CloudFront to securely access private S3 content |
| CloudWatch | Monitors resources and metrics |
| SNS | Sends alert notifications |

[Back to top](#table-of-contents)

---

## Application Folder Structure

Recommended project structure:

```text
soulinspire-web-app/
├── index.html
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   └── app.js
├── assets/
│   ├── logo.svg
│   ├── hero-retail.svg
│   ├── icon-security.svg
│   ├── icon-cloud.svg
│   ├── icon-support.svg
│   └── icon-monitoring.svg
├── docs/
│   └── screenshots/
│       ├── soulinspire-aws-architecture.png
│       ├── vpc-configuration.png
│       ├── subnets.png
│       ├── internet-gateway.png
│       ├── route-table.png
│       ├── security-group-rules.png
│       ├── iam-configuration.png
│       ├── ec2-instance.png
│       ├── amazon-linux-login.png
│       ├── apache-running.png
│       ├── nodejs-running.png
│       ├── s3-bucket.png
│       ├── s3-uploaded-files.png
│       ├── cloudfront-distribution.png
│       ├── origin-access-control.png
│       ├── cloudwatch-dashboard.png
│       ├── cloudwatch-alarm.png
│       ├── sns-topic.png
│       ├── cloudfront-error-before-fix.png
│       └── cloudfront-success-after-fix.png
└── README.md
```

Upload only the frontend website files to S3:

```text
index.html
css/
js/
assets/
```

Keep the README file in GitHub for documentation.

[Back to top](#table-of-contents)

---

## Prerequisites

Before deployment, ensure the following are available:

- AWS account
- IAM user or role with required permissions
- EC2 key pair
- Basic knowledge of EC2 SSH access
- Static frontend files
- S3 bucket
- CloudFront distribution
- VPC with public and private subnets
- Security Group rules
- CloudWatch and SNS access

[Back to top](#table-of-contents)

---

## VPC and Networking Design

The VPC provides the networking foundation for the application.

### VPC Components

| Component | Description |
|---|---|
| VPC | Main isolated network environment |
| Public Subnet | Hosts the EC2 backend server |
| Private Subnet | Reserved for future database or private services |
| Internet Gateway | Allows public subnet resources to access the internet |
| Route Table | Routes internet-bound traffic through the Internet Gateway |
| Security Group | Controls traffic to the backend EC2 instance |

### VPC Setup Steps

1. Create a VPC.
2. Create a public subnet.
3. Create a private subnet.
4. Attach an Internet Gateway to the VPC.
5. Create or update the route table.
6. Add a route to the Internet Gateway.
7. Associate the public subnet with the public route table.
8. Launch the EC2 backend server in the public subnet.
9. Attach the required Security Group to the EC2 instance.

### Screenshots: VPC and Networking

**Screenshot Space: VPC**

<img width="1594" height="874" alt="image" src="https://github.com/user-attachments/assets/4e1d9afa-d266-48aa-8ab3-96827f269e9c" />

**Screenshot Space: Public and Private Subnets**

![Public and Private Subnets](docs/screenshots/subnets.png)

**Screenshot Space: Internet Gateway**

![Internet Gateway](docs/screenshots/internet-gateway.png)

**Screenshot Space: Route Table**

![Route Table](docs/screenshots/route-table.png)

[Back to top](#table-of-contents)

---

## IAM Configuration

IAM was used to control access to AWS services and resources.

### IAM Purpose

IAM helps secure the AWS environment by managing users, roles, permissions, and access policies.

### IAM Best Practices Used

- Use least privilege access.
- Avoid using the root account for daily tasks.
- Assign only required permissions.
- Use IAM roles where possible.
- Protect access with strong authentication.

### Screenshot Space: IAM

![IAM Configuration](docs/screenshots/iam-configuration.png)

[Back to top](#table-of-contents)

---

## EC2 Backend Server

One EC2 instance was created as the backend test server.

### EC2 Configuration

| Item | Configuration |
|---|---|
| Number of Instances | 1 |
| Instance Type | t3.micro |
| Operating System | Amazon Linux 2023 |
| Server Role | Backend server |
| Web Server | Apache HTTP Server |
| HTTP Port | 80 |
| Backend Runtime | Node.js |
| Backend Port | 4000 |
| Network Placement | Public subnet |
| Access Control | Security Group |

### EC2 Deployment Steps

1. Open the Amazon EC2 console.
2. Launch a new EC2 instance.
3. Select Amazon Linux 2023 as the Amazon Machine Image.
4. Choose t3.micro as the instance type.
5. Select or create an EC2 key pair.
6. Place the instance inside the project VPC.
7. Select the public subnet.
8. Enable public IP assignment.
9. Attach the backend Security Group.
10. Launch the instance.
11. Connect to the instance through SSH.
12. Install Apache HTTP Server.
13. Install Node.js.
14. Test Apache on port 80.
15. Test Node.js on port 4000.

### Screenshot Space: EC2 Instance

<img width="1903" height="733" alt="image" src="https://github.com/user-attachments/assets/b1d52403-3620-41df-b86b-fff11ba7834c" />

[Back to top](#table-of-contents)

---

## Amazon Linux 2023 Terminal Login Session

Use SSH to connect to the Amazon Linux 2023 EC2 instance.

### SSH Login Command

Use the EC2 key pair and the public IP address of the EC2 instance.

Example command:

```bash
ssh -i soulinspire-key.pem ec2-user@203.0.113.10
```

Example values used above:

| Value | Meaning |
|---|---|
| soulinspire-key.pem | EC2 key pair file |
| ec2-user | Default Amazon Linux user |
| 203.0.113.10 | Example EC2 public IP address |

### Expected Login Session

After successful login, the terminal should show an Amazon Linux 2023 session.

```text
   ,     #_
   ~\_  ####_        Amazon Linux 2023
  ~~  \_#####\
  ~~     \###|
  ~~       \#/ ___
   ~~       V~' '->
    ~~~         /
      ~~._.   _/
         _/ _/
       _/m/'

[ec2-user@ip-10-0-1-25 ~]$
```

### Confirm the Operating System

Run:

```bash
cat /etc/os-release
```

Expected output:

```text
NAME="Amazon Linux"
VERSION="2023"
ID="amzn"
PLATFORM_ID="platform:al2023"
PRETTY_NAME="Amazon Linux 2023"
```

### Screenshot Space: Amazon Linux Login

<img width="1878" height="798" alt="image" src="https://github.com/user-attachments/assets/a7462711-7c60-4e89-a1ec-43590be45885" />

[Back to top](#table-of-contents)

---

## Apache HTTP Server Configuration

Apache HTTP Server was installed on the EC2 instance to serve traffic on HTTP port 80.

### Install Apache

Run:

```bash
sudo dnf update -y
sudo dnf install httpd -y
```

### Start and Enable Apache

Run:

```bash
sudo systemctl start httpd
sudo systemctl enable httpd
```

### Check Apache Status

Run:

```bash
sudo systemctl status httpd
```

Expected output:

```text
Active: active (running)
```

### Create an Apache Test Page

Run:

```bash
echo "<h1>Soulinspire Backend Server is running on Apache HTTP port 80</h1>" | sudo tee /var/www/html/index.html
```

### Test Apache Locally

Run:

```bash
curl http://localhost
```

Expected output:

```html
<h1>Soulinspire Backend Server is running on Apache HTTP port 80</h1>
```

### Test Apache from a Browser

Open:

```text
http://203.0.113.10
```

Expected result:

```text
Soulinspire Backend Server is running on Apache HTTP port 80
```

### Screenshot Space: Apache Running

<img width="1675" height="637" alt="image" src="https://github.com/user-attachments/assets/eada4b22-be4c-4841-aa22-ad2b2c80dcc8" />

[Back to top](#table-of-contents)

---

## Node.js Backend Service on Port 4000

Node.js was used to run a backend test service on port 4000.

### Install Node.js

Run:

```bash
sudo dnf install nodejs -y
```

### Confirm Node.js Installation

Run:

```bash
node -v
npm -v
```

Expected output:

```text
v18.x.x
9.x.x
```

### Create Backend Application Directory

Run:

```bash
mkdir soulinspire-backend
cd soulinspire-backend
```

### Create Node.js Server File

Run:

```bash
nano server.js
```

Add this code:

```javascript
const http = require("http");

const hostname = "0.0.0.0";
const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    message: "Soulinspire Retail Backend is running",
    service: "Node.js",
    port: 4000
  }));
});

server.listen(port, hostname, () => {
  console.log(`Soulinspire backend server running at http://${hostname}:${port}/`);
});
```

### Start Node.js Backend

Run:

```bash
node server.js
```

Expected output:

```text
Soulinspire backend server running at http://0.0.0.0:4000/
```

### Test Node.js Locally

Open another SSH session and run:

```bash
curl http://localhost:4000
```

Expected output:

```json
{"message":"Soulinspire Retail Backend is running","service":"Node.js","port":4000}
```

### Run Node.js in the Background

Run:

```bash
nohup node server.js > soulinspire-backend.log 2>&1 &
```

Check the running process:

```bash
ps aux | grep node
```

Expected output:

```text
ec2-user   12345  0.0  1.5  node server.js
```

### Screenshot Space: Node.js Running

<img width="1754" height="882" alt="image" src="https://github.com/user-attachments/assets/4cd8d685-08e3-492a-a6f2-e8d05f76226e" />

[Back to top](#table-of-contents)

---

## Amazon S3 Private Frontend Hosting

Amazon S3 was used to store the frontend application files.

The S3 bucket was kept private. Public access was blocked so users cannot access the frontend directly from the S3 bucket.

CloudFront was used as the public delivery layer.

### S3 Hosting Configuration

| Setting | Configuration |
|---|---|
| Bucket Access | Private |
| Public Access | Blocked |
| Static Files | Uploaded |
| Direct S3 Public Access | Disabled |
| CloudFront Access | Enabled through OAC |

### Files Uploaded to S3

```text
index.html
css/
js/
assets/
```

### S3 Setup Steps

1. Create an S3 bucket.
2. Keep public access blocked.
3. Upload index.html.
4. Upload the css folder.
5. Upload the js folder.
6. Upload the assets folder.
7. Confirm that index.html is at the root level of the bucket.
8. Connect the bucket to CloudFront.
9. Configure Origin Access Control.
10. Apply the CloudFront-generated bucket policy.

### Screenshots: S3

**Screenshot Space: S3 Bucket**

<img width="1854" height="870" alt="image" src="https://github.com/user-attachments/assets/539438f4-2c1e-4bf9-9f3b-b9cbac1c6e64" />

**Screenshot Space: S3 Uploaded Files**

<img width="1882" height="721" alt="image" src="https://github.com/user-attachments/assets/dfefe317-ee65-439c-8350-294b47d8e1ca" />

[Back to top](#table-of-contents)

---

## CloudFront Distribution with OAC

Amazon CloudFront was used to securely deliver the frontend website to users.

CloudFront uses Origin Access Control to access the private S3 bucket. This ensures that users access the website through CloudFront and not directly through S3.

### CloudFront Configuration

| Setting | Configuration |
|---|---|
| Origin | Private S3 bucket |
| Origin Access | Origin Access Control |
| Viewer Access | CloudFront distribution domain name |
| Default Root Object | index.html |
| Frontend Delivery | CloudFront |
| S3 Public Access | Blocked |

### CloudFront Setup Steps

1. Open the CloudFront console.
2. Create a new distribution.
3. Select the private S3 bucket as the origin.
4. Create or select an Origin Access Control.
5. Apply the recommended bucket policy to the S3 bucket.
6. Set the default root object to:

   ```text
   index.html
   ```

7. Create the distribution.
8. Wait for the distribution status to become deployed.
9. Copy the CloudFront distribution domain name.
10. Test the frontend in a browser.

### Example CloudFront URL Format

```text
https://d111111abcdef8.cloudfront.net
```

Expected result:

The Soulinspire Retail Application frontend loads successfully.

### Screenshots: CloudFront

**Screenshot Space: CloudFront Distribution**

<img width="1860" height="846" alt="image" src="https://github.com/user-attachments/assets/9e4e0fae-eeea-43a9-96d4-99d1f9ca6ab0" />

**Screenshot Space: Origin Access Control**

<img width="1850" height="871" alt="image" src="https://github.com/user-attachments/assets/6a8bbc23-fde0-4bdb-a1e0-5db789b54a98" />

[Back to top](#table-of-contents)

---

## Security Group Configuration

The Security Group controls inbound and outbound traffic to the EC2 backend server.

### Recommended Inbound Rules

| Type | Protocol | Port | Source | Purpose |
|---|---|---|---|---|
| SSH | TCP | 22 | Trusted admin IP | EC2 terminal access |
| HTTP | TCP | 80 | 0.0.0.0/0 or controlled source | Apache web access |
| Custom TCP | TCP | 4000 | Trusted source only | Node.js backend testing |

### Recommended Outbound Rules

| Type | Protocol | Port | Destination | Purpose |
|---|---|---|---|---|
| All Traffic | All | All | 0.0.0.0/0 | Allows package updates and external access |

### Security Note

> Do not leave SSH port 22 open to the whole internet in a production environment. Restrict SSH access to a trusted IP address.
>
> Do not expose port 4000 publicly in production unless there is a specific security-controlled reason.

### Screenshot Space: Security Group

### FOR INBOUND RULES
<img width="1262" height="696" alt="image" src="https://github.com/user-attachments/assets/6ae6467f-7413-4786-b65c-c23626026e4e" />

### FOR OUTBOUND RULES
<img width="1882" height="792" alt="image" src="https://github.com/user-attachments/assets/4eb2de13-5794-4db5-be50-baefd45113a5" />

[Back to top](#table-of-contents)

---

## CloudWatch Monitoring

Amazon CloudWatch was used to monitor the infrastructure.

### CloudWatch Monitoring Scope

CloudWatch can monitor:

- EC2 CPU utilization
- EC2 network traffic
- EC2 status checks
- CloudFront requests
- CloudFront error rates
- Application logs
- Alarm conditions

### Example CloudWatch Alarms

| Alarm | Purpose |
|---|---|
| EC2 High CPU Utilization | Detect high backend server load |
| EC2 Status Check Failed | Detect EC2 health issues |
| High Network In | Detect unusual inbound traffic |
| CloudFront 4xx Error Rate | Detect frontend access issues |
| CloudFront 5xx Error Rate | Detect origin or delivery issues |

### Screenshots: CloudWatch

**Screenshot Space: CloudWatch Dashboard**

![CloudWatch Dashboard](docs/screenshots/cloudwatch-dashboard.png)

**Screenshot Space: CloudWatch Alarm**

![CloudWatch Alarm](docs/screenshots/cloudwatch-alarm.png)

[Back to top](#table-of-contents)

---

## SNS Notification Service

Amazon SNS was used to send notifications from CloudWatch alarms.

### SNS Purpose

SNS helps notify administrators when a monitored condition requires attention.

Examples:

- EC2 CPU usage becomes too high.
- EC2 status check fails.
- CloudFront error rate increases.
- Application traffic becomes unusual.

### SNS Setup Steps

1. Open the Amazon SNS console.
2. Create an SNS topic.
3. Add an email subscription.
4. Confirm the subscription from the email inbox.
5. Connect the SNS topic to a CloudWatch alarm.
6. Test the alarm notification.

### Screenshot Space: SNS Topic

![SNS Topic](docs/screenshots/sns-topic.png)

[Back to top](#table-of-contents)

---

## Request Flow and Operations

The request flow explains how users access the application.

1. The user opens the CloudFront distribution domain name.
2. CloudFront receives the browser request.
3. CloudFront checks its cache.
4. If the file is cached, CloudFront serves it directly.
5. If the file is not cached, CloudFront requests it from the private S3 bucket.
6. Origin Access Control authorizes CloudFront to read from the private S3 bucket.
7. S3 returns the frontend files to CloudFront.
8. CloudFront delivers the frontend to the user.
9. Backend test services can run on the EC2 instance.
10. Apache serves HTTP traffic on port 80.
11. Node.js serves backend test responses on port 4000.
12. CloudWatch monitors infrastructure metrics.
13. CloudWatch alarms send notifications through SNS.

[Back to top](#table-of-contents)

---

## Screenshots Evidence Section

Use this section to organize proof of implementation.

### Screenshot Checklist

| Area | Screenshot File |
|---|---|
| AWS architecture diagram | `docs/screenshots/soulinspire-aws-architecture.png` |
| VPC configuration | `docs/screenshots/vpc-configuration.png` |
| Public and private subnets | `docs/screenshots/subnets.png` |
| Internet Gateway | `docs/screenshots/internet-gateway.png` |
| Route table | `docs/screenshots/route-table.png` |
| Security Group rules | `docs/screenshots/security-group-rules.png` |
| IAM configuration | `docs/screenshots/iam-configuration.png` |
| EC2 instance | `docs/screenshots/ec2-instance.png` |
| Amazon Linux login | `docs/screenshots/amazon-linux-login.png` |
| Apache running | `docs/screenshots/apache-running.png` |
| Node.js running | `docs/screenshots/nodejs-running.png` |
| S3 bucket | `docs/screenshots/s3-bucket.png` |
| S3 uploaded files | `docs/screenshots/s3-uploaded-files.png` |
| CloudFront distribution | `docs/screenshots/cloudfront-distribution.png` |
| Origin Access Control | `docs/screenshots/origin-access-control.png` |
| CloudWatch dashboard | `docs/screenshots/cloudwatch-dashboard.png` |
| CloudWatch alarm | `docs/screenshots/cloudwatch-alarm.png` |
| SNS topic | `docs/screenshots/sns-topic.png` |
| CloudFront error before fix | `docs/screenshots/cloudfront-error-before-fix.png` |
| CloudFront success after fix | `docs/screenshots/cloudfront-success-after-fix.png` |

[Back to top](#table-of-contents)

---

## Testing the Deployment

Test each layer of the application separately.

### Test Apache on EC2

Run:

```bash
curl http://localhost
```

Expected output:

```html
<h1>Soulinspire Backend Server is running on Apache HTTP port 80</h1>
```

### Test Node.js on EC2

Run:

```bash
curl http://localhost:4000
```

Expected output:

```json
{"message":"Soulinspire Retail Backend is running","service":"Node.js","port":4000}
```

### Test CloudFront Frontend

Open the CloudFront distribution domain name in a browser.

Example:

```text
https://d111111abcdef8.cloudfront.net
```

Expected result:

The Soulinspire Retail Application frontend loads successfully.

### Test S3 Privacy

Try opening an S3 object URL directly.

Expected result:

```text
Access Denied
```

This confirms that the S3 bucket is private and protected.

[Back to top](#table-of-contents)

---

## Troubleshooting

### Issue: Frontend Did Not Load Through CloudFront

During testing, the frontend did not come up when accessed using the CloudFront distribution domain name.

The browser showed an error instead of loading the Soulinspire Retail Application.

#### Cause

The CloudFront distribution was not configured with the default root object.

The missing value was:

```text
index.html
```

Without this value, CloudFront did not know which file to serve when the distribution domain name was opened directly.

#### Resolution

The issue was resolved by entering index.html in the CloudFront default root object configuration.

#### Fix Steps

1. Open the CloudFront console.
2. Select the Soulinspire CloudFront distribution.
3. Open the distribution settings.
4. Locate the Default root object field.
5. Enter:

   ```text
   index.html
   ```

6. Save the changes.
7. Wait for CloudFront to deploy the update.
8. Open the CloudFront distribution domain name again.
9. Confirm that the frontend loads successfully.

**Screenshot Space: CloudFront Error Before Fix**

<img width="1229" height="435" alt="image" src="https://github.com/user-attachments/assets/9a195f25-51a0-4867-9154-3d9df5b60059" />

## Entering index.html in the CloudFront default root object configuration.

<img width="1471" height="754" alt="image" src="https://github.com/user-attachments/assets/050789f7-d0bc-41d5-b60d-fcaf8006b8f8" />

**Screenshot Space: CloudFront Success After Fix**
<img width="1776" height="937" alt="image" src="https://github.com/user-attachments/assets/b60be503-dc49-4896-82f1-f66210db4c0f" />

### Common Issues and Fixes

| Issue | Likely Cause | Fix |
|---|---|---|
| CloudFront shows an error | Default root object missing | Set default root object to index.html |
| S3 returns Access Denied | Bucket is private | Access the website through CloudFront |
| CSS or JS not loading | Incorrect folder path | Confirm css, js, and assets folders were uploaded correctly |
| Apache page not loading | Apache is not running | Run `sudo systemctl start httpd` |
| Node.js backend not responding | Node service is not running | Run `node server.js` or start it in the background |
| Port 4000 not reachable | Security Group does not allow port 4000 | Add a controlled inbound rule for TCP 4000 |
| SSH connection fails | Wrong key, wrong username, wrong IP, or blocked port 22 | Use ec2-user, confirm key pair, confirm public IP, and check Security Group |
| CloudFront still shows old error | Cached response | Create a CloudFront invalidation |

### Optional CloudFront Cache Invalidation Command

Run this if CloudFront continues showing an old cached error after the fix:

```bash
aws cloudfront create-invalidation --distribution-id E1234567890ABC --paths "/*"
```

Expected response:

```json
{
  "Invalidation": {
    "Status": "InProgress"
  }
}
```

[Back to top](#table-of-contents)

---

## Recommendations

### Security Recommendations

- Keep the S3 bucket private.
- Use CloudFront Origin Access Control instead of public S3 access.
- Restrict SSH access to a trusted IP address.
- Avoid exposing port 4000 publicly in production.
- Apply IAM least privilege permissions.
- Avoid storing secrets inside frontend or backend code.
- Use HTTPS for production traffic.
- Use AWS Systems Manager Session Manager for safer EC2 access.

### Networking Recommendations

- Use public subnets only for resources that require direct internet access.
- Place databases and internal services in private subnets.
- Use route tables carefully.
- Use Security Groups with only required ports open.
- Consider using a NAT Gateway if private subnet resources require outbound internet access.

### Monitoring Recommendations

- Create CloudWatch alarms for EC2 CPU utilization.
- Create CloudWatch alarms for EC2 status checks.
- Monitor CloudFront 4xx and 5xx error rates.
- Configure SNS email notifications for critical alarms.
- Review logs regularly during testing and after deployment.

### Cost Recommendations

- Use AWS Budgets to monitor spending.
- Stop or terminate unused EC2 instances.
- Delete unused EBS volumes.
- Avoid unnecessary CloudFront invalidations.
- Use S3 lifecycle rules where appropriate.

### Production Recommendations

- Add a custom domain using Route 53.
- Add SSL/TLS certificate using AWS Certificate Manager.
- Place backend servers behind an Application Load Balancer.
- Move backend application servers into private subnets.
- Use Auto Scaling for higher availability.
- Use Amazon RDS if database functionality is required.
- Use CI/CD tools such as GitHub Actions, AWS CodePipeline, or AWS CodeDeploy.

[Back to top](#table-of-contents)

---

## Future Improvements

Future versions of the Soulinspire Retail Application can include:

- User authentication
- Product database
- Shopping cart functionality
- Payment integration
- Admin dashboard
- Application Load Balancer
- Auto Scaling Group
- Amazon RDS database in private subnets
- Route 53 custom domain
- HTTPS using AWS Certificate Manager
- CI/CD deployment pipeline
- Centralized logging
- AWS WAF for additional web protection

[Back to top](#table-of-contents)

---

## Conclusion

The Soulinspire Retail Application on AWS demonstrates how to deploy a simple web application using a secure and cost-aware AWS architecture.

The frontend is hosted in a private S3 bucket and delivered through CloudFront using Origin Access Control. The backend test server is hosted on one EC2 instance running Amazon Linux 2023 with a t3.micro instance type.

Apache HTTP Server runs on port 80, while Node.js runs on port 4000 for backend testing.

The infrastructure includes VPC networking, public and private subnets, Internet Gateway, Security Group, IAM access control, CloudWatch monitoring, and SNS alerting.

A key troubleshooting lesson from this project was the importance of setting the CloudFront default root object to index.html. Once this configuration was corrected, the frontend loaded successfully through the CloudFront distribution domain name.

This project provides a strong foundation for hosting, securing, monitoring, and improving a retail web application on AWS.

[Back to top](#table-of-contents)

---

[Back to top](#table-of-contents)

---

## Project Status

The Soulinspire Retail Application AWS infrastructure includes the following completed components:

- Static frontend application built with HTML, CSS, JavaScript, and assets.
- Private Amazon S3 bucket used for frontend hosting.
- Amazon CloudFront configured for secure frontend delivery.
- Origin Access Control configured between CloudFront and S3.
- One EC2 backend server created.
- Amazon Linux 2023 used as the EC2 operating system.
- t3.micro selected as the EC2 instance type.
- Apache HTTP Server configured on port 80.
- Node.js backend service configured on port 4000.
- VPC, public subnet, private subnet, Internet Gateway, route table, Security Group, and IAM included in the infrastructure design.
- CloudWatch used for monitoring.
- SNS used for notifications.
- CloudFront frontend loading issue resolved by setting index.html as the default root object.

[Back to top](#table-of-contents)

---

## License

This project is licensed under the DreamPulze Technology License.

```text
MIT License

Copyright (c) 2026 Emeka Hyginus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

[Back to top](#table-of-contents)
