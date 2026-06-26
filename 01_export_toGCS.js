// export multiband image as single band image (one for each year) in the bucket 
// dhemerson.costa@ipam.org.br

// ============================================================
// WATER MASK
// ============================================================
var assetMapBiomas = "projects/mapbiomas-peru/assets/WATER/COLLECTION-4/FINAL-ASSETS/water-bodies-annual-01";
var waterClass = 6;

var classification = ee.Image(assetMapBiomas).eq(waterClass).selfMask()

// output bucket 
var bucket_name = 'shared-development-storage';
var bucket_address = 'AUXILIARES/AGUA/PERU-4/temp/';

// function to export image 
function exporting (image,name){
  image.bandNames().evaluate(function(bandnames){
    bandnames.forEach(function(bandname){
      
      Export.image.toCloudStorage({
        image:image.select(bandname), 
        description: name + '-' + bandname,
        bucket:bucket_name,
        fileNamePrefix:bucket_address + name + '-' + bandname, 
        // dimensions:, 
        region:image.geometry(), 
        scale:30,
        // crs, crsTransform, 
        maxPixels:1e13,
        // shardSize, fileDimensions, skipEmptyTiles, 
        fileFormat:'tif',
        // formatOptions, priority
      });
    });
  });
}



// cexport native mask 
exporting(classification ,'water');
print('water', classification);
