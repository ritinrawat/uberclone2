const mapService = require('../services/map.service');

const getCoordinates = async (pickup, destination) => {
    try {
        const pickUpCoordination = await mapService.getAddressCoordinate(pickup);
        const destinationCoordination = await mapService.getAddressCoordinate(destination);
         console.log("Coordination",pickUpCoordination,destinationCoordination);
          
        return { pickUpCoordination, destinationCoordination };
    } catch (error) {
        throw new Error('Error fetching coordinates');
    }
};

module.exports = { getCoordinates };
