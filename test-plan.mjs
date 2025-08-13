import { loadHypernativeConfig } from './dist/lib/config-loader.js';
import { Planner } from './dist/lib/planner.js';
import path from 'path';

async function testPlan() {
  try {
    const baseDir = process.cwd();
    const configDir = baseDir;
    
    console.log('Loading config from:', configDir);
    const config = await loadHypernativeConfig(configDir);
    console.log('Config loaded successfully');
    console.log('Resources in config:');
    console.log('- Watchlists:', Object.keys(config.watchlists || {}));
    console.log('- Custom Agents:', Object.keys(config.custom_agents || {}));
    console.log('- Notification Channels:', Object.keys(config.notification_channels || {}));
    
    const planner = new Planner(baseDir);
    const plan = await planner.generatePlan(config);
    
    console.log('\nPlan Summary:');
    console.log('- To Create:', plan.summary.to_create);
    console.log('- To Update:', plan.summary.to_update);
    console.log('- To Delete:', plan.summary.to_delete);
    console.log('- No Change:', plan.summary.no_change);
    
    if (plan.summary.to_delete > 0) {
      console.log('\n✅ CLI correctly detects resources to delete!');
      console.log('Resources to delete:');
      plan.changes.filter(c => c.change_type === 'DELETE').forEach(change => {
        console.log(`  - ${change.kind}/${change.name} (ID: ${change.remote_id})`);
      });
    } else {
      console.log('\n❌ CLI does not detect any resources to delete');
      console.log('Expected to delete these outdated agents:');
      console.log('  - 28276, 28277, 28278, 28279, 28280, 28281');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
  }
}

testPlan();