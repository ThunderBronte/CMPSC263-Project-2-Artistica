export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { art } = req.body;
  
    if (!art) {
      return res.status(400).json({ error: 'Art is requried' });
    }
  
    const artPosted = {
      1: { name: 'Artist 1', email: 'email 1', url: 'Images/Profile1.jpg'},
      2: { name: 'Artist 2', email: 'email 2', url: 'Images/Profile2.jpg'},
      3: { name: 'Artist 3', email: 'email 3', url: 'Images/Profile3.jpg'},
      4: { name: 'Artist 4', email: 'email 4', url: 'Images/Profile4.png'},
      5: { name: 'Artist 5', email: 'email 5', url: 'Images/Profile5.png'},
      6: { name: 'Artist 6', email: 'email 6', url: 'Images/Profile6.jpg'}
    };
  
    const artData = artPosted[art.toLowerCase()];
  
    if (!artData) {
      return res.status(404).json({ error: 'Art not found' });
    }
  
    return res.status(200).json(animalData);
  }
  