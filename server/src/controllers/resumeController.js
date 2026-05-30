import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createResume = async (req, res) => {
  try {
    const {
      title,
      summary,
      skills,
      experience,
      education,
      projects,
    } = req.body;

    const resume = await prisma.resume.create({
      data: {
        title,
        summary,
        skills,
        experience,
        education,
        projects,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Resume created successfully",
      resume,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyResumes = async (req, res) => {
  try {
    console.log("Logged In User:", req.user);

    const resumes = await prisma.resume.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      resumes,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json({
      resume,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    const existingResume = await prisma.resume.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const {
      title,
      summary,
      skills,
      experience,
      education,
      projects,
    } = req.body;

    const updatedResume = await prisma.resume.update({
      where: {
        id,
      },
      data: {
        title,
        summary,
        skills,
        experience,
        education,
        projects,
      },
    });

    res.status(200).json({
      message: "Resume updated successfully",
      updatedResume,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const existingResume = await prisma.resume.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    await prisma.resume.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Resume deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};