import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, you would fetch this from a database
  const data = {
    farmDetails: {
      name: "Kamau Family Estate (Live)",
      owner: "John Kamau",
      location: "Nakuru, Rift Valley (0.3031° S, 36.0800° E)",
      size: "12 Acres",
      type: "Regenerative Mixed Farming",
      crops: ["Maize (H6213)", "Climbing Beans", "Hass Avocado"],
      established: "2015"
    },
    impactMetrics: {
      waterSaved: "124,000 L",
      waterSavedGrowth: "+12%",
      soilHealth: "High (3.8% OM)",
      soilHealthGrowth: "+0.4%", 
      carbonSequestered: "45 Tons",
      biodiversityIndex: "88/100"
    },
    reputation: {
      score: 850,
      level: "Platinum Farmer",
      verifiedPractices: 8,
      lastAudit: "Oct 15, 2025"
    },
    timeline: [
      {
        id: 1,
        title: "Cover Cropping Verified",
        date: "Dec 10, 2025",
        status: "Verified",
        verifier: "Sentinel-2 Satellite Analysis",
        hash: "0x7f...8a2b",
        description: "Post-harvest cover crops identified via NDVI spectral signature."
      },
      {
        id: 2,
        title: "Soil Sample Audit",
        date: "Nov 22, 2025",
        status: "Verified",
        verifier: "Field Agent: Sarah M.",
        hash: "0x3c...9d1e",
        description: "Organic carbon levels verified at 3.8%. Lab report #8821 attached."
      },
      {
        id: 3,
        title: "Drip Irrigation Install",
        date: "Oct 05, 2025",
        status: "Pending",
        verifier: "IoT Sensor Network",
        hash: null,
        description: "Flow rate data transmission initiating. Awaiting 30-day baseline."
      }
    ]
  };

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json(data);
}
