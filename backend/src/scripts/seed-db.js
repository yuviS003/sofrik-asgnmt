require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const projectTemplates = [
  {
    title: "E-commerce Website Redesign",
    description:
      "Revamp the online store with modern UI/UX, improved performance, and mobile responsiveness.",
    tasks: [
      {
        title: "Conduct user research for UX",
        description: "Interview stakeholders and analyze user feedback.",
      },
      {
        title: "Create wireframes for homepage",
        description: "Design low-fidelity wireframes for the homepage layout.",
      },
      {
        title: "Develop checkout flow",
        description:
          "Implement a seamless checkout process with payment integration.",
      },
      {
        title: "Optimize images for faster loading",
        description: "Compress product images to improve page load times.",
      },
      {
        title: "Test responsiveness on mobile devices",
        description: "Ensure site works across various screen sizes.",
      },
    ],
  },
  {
    title: "Marketing Campaign for Product Launch",
    description:
      "Plan and execute a multi-channel marketing campaign for a new product release.",
    tasks: [
      {
        title: "Draft social media posts",
        description:
          "Create engaging posts for Instagram, Twitter, and LinkedIn.",
      },
      {
        title: "Design email newsletter",
        description:
          "Develop a visually appealing email template for the campaign.",
      },
      {
        title: "Coordinate influencer outreach",
        description: "Identify and contact influencers for product promotion.",
      },
      {
        title: "Analyze campaign metrics",
        description: "Track KPIs like click-through rates and conversions.",
      },
      {
        title: "Create promotional video script",
        description: "Write a script for a 30-second product teaser video.",
      },
    ],
  },
  {
    title: "Inventory Management System",
    description:
      "Build a system to track inventory levels, orders, and supply chain data.",
    tasks: [
      {
        title: "Define database schema",
        description: "Design MongoDB schema for inventory and orders.",
      },
      {
        title: "Implement REST API endpoints",
        description: "Create APIs for CRUD operations on inventory.",
      },
      {
        title: "Develop dashboard UI",
        description: "Build a React-based dashboard for inventory tracking.",
      },
      {
        title: "Integrate barcode scanning",
        description: "Add support for barcode scanning in the system.",
      },
      {
        title: "Write unit tests for APIs",
        description: "Ensure API reliability with Jest tests.",
      },
    ],
  },
  {
    title: "Corporate Training Portal",
    description:
      "Develop an online platform for employee training and certifications.",
    tasks: [
      {
        title: "Upload training videos",
        description: "Organize and upload training content to the portal.",
      },
      {
        title: "Create quiz module",
        description: "Develop a module for certification quizzes.",
      },
      {
        title: "Set up user progress tracking",
        description: "Track employee progress through courses.",
      },
      {
        title: "Design course landing page",
        description: "Create an engaging landing page for each course.",
      },
      {
        title: "Test user authentication flow",
        description: "Ensure secure login and access control.",
      },
    ],
  },
  {
    title: "Customer Support Chatbot",
    description:
      "Design and deploy an AI-powered chatbot for customer support.",
    tasks: [
      {
        title: "Train chatbot with FAQs",
        description: "Feed common customer queries into the chatbot model.",
      },
      {
        title: "Integrate with website",
        description: "Embed chatbot widget on the company website.",
      },
      {
        title: "Test conversation flows",
        description: "Simulate customer interactions to refine responses.",
      },
      {
        title: "Analyze user satisfaction",
        description: "Collect feedback on chatbot interactions.",
      },
      {
        title: "Update chatbot intents",
        description: "Add new intents based on user queries.",
      },
    ],
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log("Existing data cleared");

    // Create 5 users with hashed passwords
    const users = [];
    const commonPassword = "Test@123";
    const saltRounds = 10;
    for (let i = 1; i <= 5; i++) {
      const hashedPassword = await bcrypt.hash(commonPassword, saltRounds);
      const user = await User.create({
        email: `test${i}@example.com`,
        password: hashedPassword,
      });
      users.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Create 50 projects, distributed among users
    const projects = [];
    let projectCount = 0;
    for (const user of users) {
      // Each user gets approximately 10 projects
      for (let j = 0; j < 10; j++) {
        const template =
          projectTemplates[projectCount % projectTemplates.length];
        const project = await Project.create({
          title: `${template.title}`,
          description: template.description,
          status: Math.random() > 0.3 ? "active" : "completed",
          userId: user._id,
        });
        projects.push(project);
        console.log(`Created project: ${project.title}`);

        // Create 5-8 tasks per project
        const numTasks = Math.floor(Math.random() * 4) + 5; // Random between 5 and 8
        for (let k = 0; k < numTasks; k++) {
          const taskTemplate =
            template.tasks[Math.floor(Math.random() * template.tasks.length)];
          const assignedUser = users[Math.floor(Math.random() * users.length)];
          const statusOptions = ["todo", "in-progress", "done"];
          const status =
            statusOptions[Math.floor(Math.random() * statusOptions.length)];
          const dueDate =
            Math.random() > 0.2
              ? getRandomDate(new Date(), new Date(2026, 11, 31))
              : null;

          await Task.create({
            title: `${taskTemplate.title}`,
            description: taskTemplate.description,
            status,
            dueDate,
            projectId: project._id,
            userId: user._id,
            assignedUserId: assignedUser._id,
          });
          console.log(
            `Created task: ${taskTemplate.title} for project: ${project.title}, assigned to ${assignedUser.email}`
          );
        }
        projectCount++;
      }
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

seedDatabase();
