export class Validation {
  constructor(user) {
    this.userMap = user
    this.formIsValid = true
    this.outputs = []
  }
  validate() {
    this.outputs = []
    this.formIsValid = true
    if (
      !this.userMap.get('email').includes('@') &&
      this.userMap.get('email') !== '' &&
      !!this.userMap.get('email')
    ) {
      this.outputs.push({
        key: 'email',
        isVal: false,
        erroMessage: 'Mira tu correo mano',
      })
      this.formIsValid = false
    } else if (
      this.userMap.get('email') === '' &&
      !!this.userMap.get('email')
    ) {
      this.outputs.push({
        key: 'email',
        isVal: false,
        errorMessage: 'Poné tu correo',
      })
      this.formIsValid = false
    } else {
      this.outputs.push({ key: 'email', erroMessage: null, isVal: true })
    }
    if (
      this.userMap.get('password').length <= 6 &&
      this.userMap.get('password') !== '' &&
      !!this.userMap.get('password')
    ) {
      this.outputs.push({
        key: 'password',
        isVal: false,
        errorMessage: 'Verifica el largo de la contraseña',
      })
      this.formIsValid = false
    } else if (
      this.userMap.get('password') === '' &&
      !!this.userMap.get('password')
    ) {
      this.outputs.push({
        key: 'password',
        isVal: false,
        errorMessage: 'Poné contraseña',
      })
      this.formIsValid = false
    } else {
      this.outputs.push({
        key: 'password',
        isVal: true,
        errorMessage: null,
      })
    }
    if (this.userMap.get('fullname') === '' && !!this.userMap.get('fullname')) {
      this.outputs.push({
        key: 'fullname',
        isVal: false,
        errorMessage: 'Poné tu nombre',
      })
      this.formIsValid = false
    } else if (!!this.userMap.get('fullname')) {
      this.outputs.push({
        key: 'fullname',
        isVal: true,
        errorMessage: null,
      })
    }
  }
  get result() {
    return [this.outputs, this.formIsValid]
  }
}
