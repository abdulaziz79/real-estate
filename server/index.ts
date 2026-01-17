import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Properties routes
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        agent: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        agent: true,
      },
    });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

app.post('/api/properties', async (req, res) => {
  try {
    const property = await prisma.property.create({
      data: req.body,
      include: {
        agent: true,
      },
    });
    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

app.put('/api/properties/:id', async (req, res) => {
  try {
    const property = await prisma.property.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        agent: true,
      },
    });
    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

app.delete('/api/properties/:id', async (req, res) => {
  try {
    await prisma.property.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

// Agents routes
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

app.get('/api/agents/:id', async (req, res) => {
  try {
    const agent = await prisma.agent.findUnique({
      where: { id: req.params.id },
      include: {
        properties: true,
      },
    });
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    console.error('Error fetching agent:', error);
    res.status(500).json({ error: 'Failed to fetch agent' });
  }
});

// Profiles routes
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: req.params.id },
      include: {
        savedProperties: {
          include: {
            property: true,
          },
        },
      },
    });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Saved Properties routes
app.get('/api/users/:userId/saved-properties', async (req, res) => {
  try {
    const savedProperties = await prisma.savedProperty.findMany({
      where: { userId: req.params.userId },
      include: {
        property: {
          include: {
            agent: true,
          },
        },
      },
    });
    res.json(savedProperties);
  } catch (error) {
    console.error('Error fetching saved properties:', error);
    res.status(500).json({ error: 'Failed to fetch saved properties' });
  }
});

app.post('/api/users/:userId/saved-properties', async (req, res) => {
  try {
    const savedProperty = await prisma.savedProperty.create({
      data: {
        userId: req.params.userId,
        propertyId: req.body.propertyId,
      },
      include: {
        property: true,
      },
    });
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Error saving property:', error);
    res.status(500).json({ error: 'Failed to save property' });
  }
});

app.delete('/api/users/:userId/saved-properties/:propertyId', async (req, res) => {
  try {
    await prisma.savedProperty.deleteMany({
      where: {
        userId: req.params.userId,
        propertyId: req.params.propertyId,
      },
    });
    res.json({ message: 'Property unsaved successfully' });
  } catch (error) {
    console.error('Error unsaving property:', error);
    res.status(500).json({ error: 'Failed to unsave property' });
  }
});

// Messages routes
app.get('/api/messages', async (req, res) => {
  try {
    const { userId, receiverId } = req.query;
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId as string, receiverId: receiverId as string },
          { senderId: receiverId as string, receiverId: userId as string },
        ],
      },
      orderBy: {
        timestamp: 'asc',
      },
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const message = await prisma.message.create({
      data: req.body,
    });
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});


