import Utils from "../tool/utils";

test('distance given Km (lib function is secure)', () => {
    const lat1 = -9.44338035583496;
    const lon1 = 147.220001220703
    const lat2 = 61.1604995728;
    const lon2 = -45.4259986877;
    expect(Utils.distance(lat1, lon1, lat2, lon2, 'K').toFixed()).toBe("14171");
});
