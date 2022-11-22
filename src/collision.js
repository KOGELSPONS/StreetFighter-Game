function checkCollision(){   

  colliding = false;

  // check collision for each block
  blocks.forEach(function(block) {
    
    if (block.lvl == gameState || block.lvl == 0){
    
      // calculate difference from x and y axis centres
      let dx = (player.x + player.halfWidth) - (block.x + block.halfWidth);
      let dy = (player.y + player.halfHeight) - (block.y + block.halfHeight);
  
      let combinedHalfWidths  = player.halfWidth + block.halfWidth;
      let combinedHalfHeights = player.halfHeight + block.halfHeight;
  
      // x-axis collision?
      if(Math.abs(dx) < combinedHalfWidths){
        
        // y-axis collision?
        if(Math.abs(dy) < combinedHalfHeights){          
  
          let overlapX = combinedHalfWidths - Math.abs(dx);
          let overlapY = combinedHalfHeights - Math.abs(dy);          
  
          // collision is on the smallest overlap
          if(overlapX >= overlapY){
            if(dy > 0) {
              player.y += overlapY;
              colliding = "top";
              bcolliding = block.name; 
            }
            else {            
              player.y -= overlapY;
              colliding = "bottom";
              bcolliding = block.name; 
            }
          }
          else{
            if(dx > 0){ 
              player.x += overlapX; 
              colliding = "left";
              bcolliding = block.name; 
            }
            else {
              player.x -= overlapX;
              colliding = "right";
              bcolliding = block.name; 
            }
          }
        }
      }
    }
  });

  return colliding;
}