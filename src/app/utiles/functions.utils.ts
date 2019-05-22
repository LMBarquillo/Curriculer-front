export function decimalInputFilter(event) {
  return numberFilter(event, true);
}

export function integerInputFilter(event) {
  return numberFilter(event, false);
}

export function numberFilter(event, allowPeriods = true) {
  let theEvent = event || window.event;
  let key = String.fromCharCode(theEvent.keyCode || theEvent.which);

  // Filtramos para permitir sólo números (O punto decimal, si le permite)
  let regex = allowPeriods ? /\d|\.|,/ : /\d/;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
  return theEvent.returnValue;
}
