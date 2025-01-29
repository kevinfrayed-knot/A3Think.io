

const express = require("express");
const Organization = require("../models/Organization");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Step 1: Create an Organization
router.post("/create", async (req, res) => {
    try {
        const { name, description, departments, subscriptionTier } = req.body;

        // Check if organization already exists
        const existingOrg = await Organization.findOne({ name });
        if (existingOrg) {
            return res.status(400).json({ error: "Organization with this name already exists." });
        }

        const organization = new Organization({
            name,
            description,
            departments,
            subscriptionTier
        });
        await organization.save();

        res.status(201).json({
            message: "Organization created successfully. Proceed to add an admin.",
            organizationId: organization._id
        });
    } catch (err) {
        console.error("❌ Error in /create:", err);
        res.status(500).json({ error: err.message });
    }
});

// Step 2: Add an Admin User to the Organization
router.post("/add-admin", async (req, res) => {
    try {
        const { organizationId, adminName, adminEmail, adminPassword } = req.body;

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ error: "Organization not found" });
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const adminUser = new User({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            username: adminEmail,  // Ensure username is not null
            role: "admin",
            organization: organization._id
        });

        await adminUser.save();

        // Update organization with the admin ID
        organization.admin = adminUser._id;
        await organization.save();

        res.status(201).json({
            message: "Admin user created and linked to organization successfully.",
            adminId: adminUser._id
        });
    } catch (err) {
        console.error("❌ Error in /add-admin:", err);
        res.status(500).json({ error: err.message });
    }
});

// Step 3: Finalize Organization Registration (Optional for further setup)
router.post("/finalize", async (req, res) => {
    try {
        const { organizationId, additionalInfo } = req.body;

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ error: "Organization not found" });
        }

        // Apply any additional setup needed
        organization.additionalInfo = additionalInfo;
        await organization.save();

        res.status(200).json({ message: "Organization setup finalized successfully." });
    } catch (err) {
        console.error("❌ Error in /finalize:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET all organizations
router.get("/", async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (err) {
        console.error("❌ Error in GET /organizations:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET a specific organization by ID
router.get("/:id", async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ error: "Organization not found" });
        }
        res.status(200).json(organization);
    } catch (err) {
        console.error("❌ Error in GET /organizations/:id:", err);
        res.status(500).json({ error: err.message });
    }
});

// Update Organization
router.put("/:id", async (req, res) => {
    try {
        const updatedOrganization = await Organization.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOrganization) {
            return res.status(404).json({ error: "Organization not found" });
        }

        res.status(200).json({
            message: "Organization updated successfully.",
            organization: updatedOrganization,
        });
    } catch (error) {
        console.error("❌ Error in PUT /organizations/:id:", error);
        res.status(500).json({ error: error.message });
    }
});

// Delete Organization
router.delete("/:id", async (req, res) => {
    try {
        const deletedOrganization = await Organization.findByIdAndDelete(req.params.id);
        if (!deletedOrganization) {
            return res.status(404).json({ error: "Organization not found" });
        }

        res.status(200).json({ message: "Organization deleted successfully." });
    } catch (error) {
        console.error("❌ Error in DELETE /organizations/:id:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;



