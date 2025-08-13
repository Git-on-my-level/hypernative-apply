#!/usr/bin/env tsx

import axios from 'axios';

const CLIENT_ID = 'RGmMHIBvM30KGSYVYU95';
const CLIENT_SECRET = '#%TWo5DGjAbZ@TvQMMZrjX9K&Q0d%nYMh2JZH6fI';
const BASE_URL = 'https://api.hypernative.xyz';

async function fetchCustomAgent(agentId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/custom-agents/${agentId}`, {
      headers: {
        'x-client-id': CLIENT_ID,
        'x-client-secret': CLIENT_SECRET,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching agent ${agentId}:`, error.response?.data || error.message);
    return null;
  }
}

async function main() {
  console.log('Fetching custom agent examples...\n');
  
  // Fetch both agents
  const agent1 = await fetchCustomAgent(28201);
  const agent2 = await fetchCustomAgent(28202);
  
  if (agent1) {
    console.log('=== Agent 28201 ===');
    console.log(JSON.stringify(agent1, null, 2));
    console.log();
  }
  
  if (agent2) {
    console.log('=== Agent 28202 ===');
    console.log(JSON.stringify(agent2, null, 2));
    console.log();
  }
  
  // Try to list all agents to see the structure
  try {
    console.log('=== Listing all custom agents ===');
    const listResponse = await axios.get(`${BASE_URL}/custom-agents`, {
      headers: {
        'x-client-id': CLIENT_ID,
        'x-client-secret': CLIENT_SECRET,
        'Content-Type': 'application/json'
      },
      params: {
        limit: 100
      }
    });
    
    console.log(`Total agents: ${listResponse.data.length}`);
    
    // Find our specific agents - check both id formats
    const ourAgents = listResponse.data.filter((agent: any) => 
      agent.id === 28201 || agent.id === 28202 || 
      agent.agentId === 28201 || agent.agentId === 28202 ||
      agent.id === '28201' || agent.id === '28202'
    );
    
    if (ourAgents.length > 0) {
      console.log('Found our agents in the list:');
      console.log(JSON.stringify(ourAgents, null, 2));
    } else {
      // Show last few agents (most recent)
      console.log('Showing last 5 agents (most recent):');
      const recentAgents = listResponse.data.slice(-5).map((agent: any) => ({
        id: agent.id || agent.agentId,
        name: agent.agentName || agent.name,
        type: agent.agentType || agent.type,
        state: agent.state || agent.enabled
      }));
      console.log(JSON.stringify(recentAgents, null, 2));
    }
  } catch (error: any) {
    console.error('Error listing agents:', error.response?.data || error.message);
  }
}

main();