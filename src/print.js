import join from 'lodash/join'

export default function printMe() {
    const print = join(['Hello', 'World!!!'], ' ')
    console.log('print: ', print)
}