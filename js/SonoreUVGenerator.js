BoundingUVGenerator = {
    generateTopUV: function( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC) {
        var ax = geometry.vertices[ indexA ].x,
            ay = geometry.vertices[ indexA ].y,

            bx = geometry.vertices[ indexB ].x,
            by = geometry.vertices[ indexB ].y,

            cx = geometry.vertices[ indexC ].x,
            cy = geometry.vertices[ indexC ].y,

            bb = extrudedShape.getBoundingBox(),
            bbx = bb.maxX - bb.minX,
            bby = bb.maxY - bb.minY;

        return [
            new THREE.UV( ( ax - bb.minX ) / bbx, 1 - ( ay - bb.minY ) / bby ),
            new THREE.UV( ( bx - bb.minX ) / bbx, 1 - ( by - bb.minY ) / bby ),
            new THREE.UV( ( cx - bb.minX ) / bbx, 1 - ( cy - bb.minY ) / bby )
        ];
    },

    generateBottomUV: function( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC) {
        return this.generateTopUV( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC );
    },

    generateSideWallUV: function( geometry, extrudedShape, wallContour, extrudeOptions,
                                  indexA, indexB, indexC, indexD, stepIndex, stepsLength,
                                  contourIndex1, contourIndex2 ) {
        var ax = geometry.vertices[ indexA ].x,
            ay = geometry.vertices[ indexA ].y,
            az = geometry.vertices[ indexA ].z,

            bx = geometry.vertices[ indexB ].x,
            by = geometry.vertices[ indexB ].y,
            bz = geometry.vertices[ indexB ].z,

            cx = geometry.vertices[ indexC ].x,
            cy = geometry.vertices[ indexC ].y,
            cz = geometry.vertices[ indexC ].z,

            dx = geometry.vertices[ indexD ].x,
            dy = geometry.vertices[ indexD ].y,
            dz = geometry.vertices[ indexD ].z;

        var amt = extrudeOptions.amount,
            bb = extrudedShape.getBoundingBox(),
            bbx = bb.maxX - bb.minX,
            bby = bb.maxY - bb.minY;

        if ( Math.abs( ay - by ) < 0.01 ) {
            return [
                new THREE.UV( ax / bbx, az / amt),
                new THREE.UV( bx / bbx, bz / amt),
                new THREE.UV( cx / bbx, cz / amt),
                new THREE.UV( dx / bbx, dz / amt)
            ];
        } else {
            return [
                new THREE.UV( ay / bby, az / amt ),
                new THREE.UV( by / bby, bz / amt ),
                new THREE.UV( cy / bby, cz / amt ),
                new THREE.UV( dy / bby, dz / amt )
            ];
        }
    }
};