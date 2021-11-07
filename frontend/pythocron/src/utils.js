export function getAttrFromLocationState(locationState, attrName) {
    if (locationState !== null)
        if (attrName in locationState)
            return locationState[attrName]
    return false
}
