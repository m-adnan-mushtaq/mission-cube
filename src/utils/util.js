export function giveValidClass(checker) {
    if (checker === '') return ''
    return checker ? 'is-valid' : 'is-invalid'
}


export function updateObject(oldObject,newProps) {
    return {...oldObject,...newProps}
}
export function reqStartUtil(state, { payload }) {
    state.loading = true
    state.error=null
}

export function reqFailUtil(state, { payload }) {
    state.loading = false
    state.error = payload
}