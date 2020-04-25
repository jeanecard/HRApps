export class HROpenLayerUtils {
  public static flyTo(location, done, mapView): void {
    var duration = 4000;
    let view = mapView;//this.mapView;
    var zoom = view.getZoom();
    var parts = 4;
    var called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    view.animate({
      center: location,
      duration: duration
    }, callback);
    view.animate({
      zoom: zoom - 1,
      duration: duration / 4
    }, {
      zoom: zoom,
      duration: duration / 4
    }, callback);
  }
}
