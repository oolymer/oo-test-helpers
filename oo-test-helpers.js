;(function (global) {
  const MockInteractions = window.MockInteractions

  var HAS_NEW_MOUSE = (function() {
    var has = false;
    try {
      has = Boolean(new MouseEvent('x'));
    } catch (_) {}
    return has;
  })();

  function makeMouseEvent(type, xy, node) {
    var props = {
      bubbles: true,
      cancelable: true,
      clientX: xy.x,
      clientY: xy.y,
      // Allow event to go outside a ShadowRoot.
      composed: true,
      // Make this a primary input.
      buttons: 1 // http://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
    };
    var e;
    if (HAS_NEW_MOUSE) {
      e = new MouseEvent(type, props);
    } else {
      e = document.createEvent('MouseEvent');
      e.initMouseEvent(
        type, props.bubbles, props.cancelable,
        null, /* view */
        null, /* detail */
        0,    /* screenX */
        0,    /* screenY */
        props.clientX, props.clientY,
        false, /*ctrlKey */
        false, /*altKey */
        false, /*shiftKey */
        false, /*metaKey */
        0,     /*button */
        null   /*relatedTarget*/);
    }
    node.dispatchEvent(e);
  }

  /**
   * Returns the (x,y) coordinates representing the middle of a node.
   *
   * @param {!Element} node An element.
   */
  function middleOfNode(node) {
    var bcr = node.getBoundingClientRect();
    return {
      y: bcr.top + (bcr.height / 2),
      x: bcr.left + (bcr.width / 2)
    };
  }

  /**
   * Generate a click event on a given node, optionally at a given coordinate.
   * @param {!Element} node The node to fire the click event on.
   * @param {{ x: number, y: number }=} xy Optional. The (x,y) coordinates the mouse event should
   * be fired from.
   */
  function click(node, xy) {
    xy = xy || middleOfNode(node);
    makeMouseEvent('click', xy, node);
  }

  /**
   * Fires a `mouseenter` mouse event on a specific node, at a given set of coordinates.
   * This event bubbles and is cancellable. If the (x,y) coordinates are
   * not specified, the middle of the node will be used instead.
   *
   * @param {!Element} node The node to fire the event on.
   * @param {{ x: number, y: number }=} xy Optional. The (x,y) coordinates the mouse event should be fired from.
   */
  function mouseenter(node, xy) {
    xy = xy || middleOfNode(node);
    makeMouseEvent('mouseenter', xy, node);
  }

  /**
   * Fires a `mouseenter` mouse event on a specific node, at a given set of coordinates.
   * This event bubbles and is cancellable. If the (x,y) coordinates are
   * not specified, the middle of the node will be used instead.
   *
   * @param {!Element} node The node to fire the event on.
   * @param {{ x: number, y: number }=} xy Optional. The (x,y) coordinates the mouse event should be fired from.
   */
  function mouseover(node, xy) {
    xy = xy || middleOfNode(node);
    makeMouseEvent('mouseover', xy, node);
  }

  /**
   * Fires a `mouseleave` mouse event on a specific node, at a given set of coordinates.
   * This event bubbles and is cancellable. If the (x,y) coordinates are
   * not specified, the middle of the node will be used instead.
   *
   * @param {!Element} node The node to fire the event on.
   * @param {{ x: number, y: number }=} xy Optional. The (x,y) coordinates the mouse event should be fired from.
   */
  function mouseleave(node, xy) {
    xy = xy || middleOfNode(node);
    makeMouseEvent('mouseleave', xy, node);
  }

  MockInteractions.click = click;
  MockInteractions.mouseenter = mouseenter;
  MockInteractions.mouseleave = mouseleave;
  MockInteractions.mouseover = mouseover;
})(this)
