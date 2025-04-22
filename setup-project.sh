#!/bin/bash

# ---------------------------
# STEP 1: CREATE LABELS
# ---------------------------
echo "Creating labels..."

# Type labels
gh label create "feature" --color "0e8a16" --description "New feature"
gh label create "testing" --color "f9d0c4" --description "Testing and QA"
gh label create "ci/cd" --color "5319e7" --description "Continuous Integration/Deployment"

# Priority labels
gh label create "high" --color "b60205" --description "High priority"
gh label create "medium" --color "fbca04" --description "Medium priority"
gh label create "low" --color "0e8a16" --description "Low priority"

# Role labels
gh label create "frontend" --color "c2e0c6" --description "Frontend work"
gh label create "backend" --color "fef2c0" --description "Backend work"
gh label create "fullstack" --color "fad8c7" --description "Full stack work"

# Status labels
gh label create "in progress" --color "cccccc" --description "Currently in progress"
gh label create "blocked" --color "ff0000" --description "Blocked and needs attention"
gh label create "ready for review" --color "0052cc" --description "Ready for code review"
# ---------------------------
# STEP 2: CREATE ISSUES (UPDATED)
# ---------------------------

echo "Creating issues..."

gh issue create --title "Implement Multi-Tenancy Support" --body "$(cat <<EOF
### Description
Implement support for multiple restaurants within the system.

### Checklist
- [ ] Design and create \`Restaurant\` model with branding color
- [ ] Update \`Category\`, \`Menu\`, and \`User\` models to associate with \`Restaurant\`
- [ ] Middleware for data isolation
- [ ] Update API endpoints
EOF
)" --label "feature,backend,high"

gh issue create --title "Set Up Role-Based Access Control" --body "$(cat <<EOF
### Description
Allow role-based permissions across the application.

### Checklist
- [ ] Add roles to \`User\` model (Super Admin, Admin, Manager, Kitchen Handler)
- [ ] Middleware for role checks
- [ ] Restrict API per role
- [ ] Role-based frontend display
EOF
)" --label "feature,backend,high"

gh issue create --title "Develop Super Admin Dashboard" --body "$(cat <<EOF
### Description
Build a dashboard for Super Admin to manage restaurants, users, and view system-wide data.

### Checklist
- [ ] UI for Super Admin to manage restaurants and users
- [ ] CRUD for restaurants and users
- [ ] Branding color integration
- [ ] Access to analytics
EOF
)" --label "feature,frontend,backend,high"

gh issue create --title "Implement QR Code Generation for Menus" --body "$(cat <<EOF
### Description
Enable QR code generation for table-specific menu access.

### Checklist
- [ ] Generate unique QR codes per table
- [ ] Encode restaurant ID and table number
- [ ] Landing page for scanned menu
- [ ] Test QR-to-menu flow
EOF
)" --label "feature,frontend,backend,medium"

gh issue create --title "Build Cart and Order System" --body "$(cat <<EOF
### Description
Create a cart and order workflow from menu selection to order completion.

### Checklist
- [ ] Cart: add, update, remove items
- [ ] Order model and table linkage
- [ ] Order API endpoints
- [ ] Order views per role (Admin, Kitchen Handler, Customer)
EOF
)" --label "feature,frontend,backend,high"

gh issue create --title "Create Analytics Dashboard" --body "$(cat <<EOF
### Description
Create real-time data dashboards for Admin and Super Admin roles.

### Checklist
- [ ] Dashboard UI with metrics
- [ ] Backend data aggregation
- [ ] Charts and visualizations
- [ ] Role-based filtering (restaurant-level, system-level)
EOF
)" --label "feature,frontend,backend,medium"

gh issue create --title "Develop Landing Page with Registration" --body "$(cat <<EOF
### Description
Create a landing page with simple UX for sign-up and redirection to appropriate dashboards.

### Checklist
- [ ] Landing page design and styling
- [ ] Registration form for restaurant and user
- [ ] Authentication + redirection to role-specific dashboards
- [ ] Responsive design for mobile/tablet
EOF
)" --label "feature,frontend,medium"

gh issue create --title "Set Up Testing Framework" --body "$(cat <<EOF
### Description
Implement backend and frontend testing using industry standard tools.

### Checklist
- [ ] Select frameworks (e.g. Jest, Mocha)
- [ ] Backend unit tests
- [ ] Frontend unit/component tests
- [ ] Integration test coverage
EOF
)" --label "testing,backend,frontend,medium"

gh issue create --title "Configure CI/CD Pipeline" --body "$(cat <<EOF
### Description
Automate testing and deployment processes using GitHub Actions or external providers.

### Checklist
- [ ] Set up GitHub Actions workflow for CI
- [ ] Configure deployment targets (Vercel, Render, etc.)
- [ ] Manage secrets and environment variables
- [ ] Add rollback support on failure
EOF
)" --label "ci/cd,backend,frontend,medium"

echo "✅ Done! Issues with proper formatting and checklists have been created."
