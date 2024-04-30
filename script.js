$(document).ready(function() {
    // Fetch block data from blocks.json
    $.getJSON("blocks.json", function(data) {
      // Initialize Select2 for the block input
      $('.blockInput').select2({
        placeholder: 'Select a block...',
        minimumInputLength: 0,
        width: '480px',
        data: data.values.map(function(value) {
          return { id: value, text: value };
        })
      });
    });
  
    // Fetch biome data from biomes.json
    $.getJSON("biomes.json", function(data) {
      // Initialize Select2 for the biome input
      $('#biome').select2({
        placeholder: 'Select a biome...',
        minimumInputLength: 0,
        width: '300px',
        data: data.values.map(function(value) {
          return { id: value, text: value };
        })
      });
    });
  });
  
  function addLayer() {
    const layerInputsDiv = document.getElementById('layerInputs');
    const newLayerInput = document.createElement('div');
    newLayerInput.classList.add('layerInput');
    newLayerInput.innerHTML = `
      <input type="number" class="heightInput" placeholder="Height" min="0" max="4064">
      <select class="blockInput" style="width: 200px;">
        <option></option>
      </select>
      <button class="removeLayerButton" onclick="removeLayer(this)">Remove</button>
    `;
    layerInputsDiv.appendChild(newLayerInput);
  }
  
  function removeLayer(button) {
    button.parentElement.remove();
  }
  
  function generateJSON() {
    const layers = [];
    document.querySelectorAll('.layerInput').forEach(layerInput => {
      const height = parseInt(layerInput.querySelector('.heightInput').value) || 1;
      const block = layerInput.querySelector('.blockInput').value || 'minecraft:air';
      layers.push({ height, block });
    });
    const biome = document.getElementById('biome').value || 'plains';
    const lakes = document.getElementById('lakes').checked || false;
    const features = document.getElementById('features').checked || false;
  
    const config = {
      layers,
      biome,
      lakes,
      features
    };
  
    const jsonResultDiv = document.getElementById('jsonResult');
    jsonResultDiv.innerHTML = '<pre>' + JSON.stringify(config).replace(/\n/g, '') + '</pre>';
  }
  