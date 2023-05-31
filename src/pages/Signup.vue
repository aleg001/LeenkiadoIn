<template>
  <div class="auth__container mx-auto my-[6rem] w-[500px]">
    <form
      ref="registerFrom"
      class="bg-white shadow-md p-[2rem] rounded-lg w-full"
      @submit.prevent="submitMode"
      @click="createUser"
    >
      <div class="form-field w-full" v-if="mode === '2'">
        <input
          @change="updateValidation"
          :class="{ 'mb-2': fullname.valid.isVal }"
          class="w-full p-2 border-[2px] border-gray-400"
          type="text"
          placeholder="Nombre completo"
          v-model.trim="fullname.val"
          id="fullname"
        />
      </div>
      <small class="text-orange-600 mt-0" v-if="!fullname.valid.isVal">{{
        fullname.valid.errorMessage
      }}</small>

      <div class="form-field w-full mb-4" v-if="mode === '1'">
        <label class="text-gray-500">Correo</label>
        <input
          @input="updateValidation"
          :class="{ 'mb-2': email.valid.isVal }"
          class="w-full p-2 mt-[0.5rem] rounded-md border-[1px] border-gray-400"
          type="email"
          placeholder="Correo electrónico"
          id="email"
          v-model.trim="email.val"
          required
        />
        <small class="text-orange-600" v-if="!email.valid.isVal">{{
          email.valid.errorMessage
        }}</small>
      </div>
      <div class="relative form-field w-full" v-if="mode === '1'">
        <label class="text-gray-500">Contraseña</label>
        <input
          @input="updateValidation"
          :class="{ 'mb-2': password.valid.isVal }"
          class="w-full p-2 mt-[0.5rem] rounded-md border-[2px] border-gray-400"
          :type="inputType"
          v-model.trim="password.val"
          placeholder="Contraseña"
          required
        />
        <span
          @click="toggleType"
          class="cursor-pointer hover:underline text-gray-600 absolute right-[10px] top-[50px]"
          >{{ displayType }}</span
        >
        <small class="text-orange-600" v-if="!password.valid.isVal">{{
          password.valid.errorMessage
        }}</small>
      </div>
      <div
        class="p-2 mb-2 font-robot text-[0.85rem] w-full text-center"
        v-if="mode === '1'"
      >
        <p class="text-gray-400">
          Al unirte aceptas nuestros términos y condiciones XD
        </p>
      </div>

      <div class="w-full">
        <button
          class="font-bold rounded-lg font-Roboto text-white bg-sky-700 p-2 w-full hover:bg-sky-800"
        >
          {{ modeCaption }}
        </button>
      </div>
      <div class="w-full pt-2 flex items-center justify-center">
        <span class="text-gray-500 mr-2">¿Ya tenés cuenta?</span
        ><router-link
          class="text-sky-700 font-bold font-Roboto hover:underline"
          to="/login"
          >Ingresá acá</router-link
        >
      </div>
    </form>
  </div>
</template>
<script>
import { Validation } from '../services/_formValidation.js'
import axios from 'axios'

export default {
  data() {
    return {
      mode: '1',
      modeCaption: 'Entrá a la comunidad más chilera',
      inputType: 'password',
      email: {
        name: 'email',
        val: '',
        valid: {
          isVal: true,
          errorMessage: null,
        },
      },
      password: {
        name: 'password',
        val: '',
        valid: {
          isVal: true,
          errorMessage: null,
        },
      },
      fullname: {
        name: 'fullname',
        val: '',
        valid: {
          isVal: true,
          errorMessage: null,
        },
      },

      formIsValid: true,
      userInfo: new Map(),
      fileName: '',
      preview: null,
    }
  },
  methods: {
    validationHandler(dataEntry) {
      const validation = new Validation(dataEntry)
      validation.validate()
      const valResult = validation.result
      this.formIsValid = valResult[1]
      const outputsArray = valResult[0]
      console.log('validation array', valResult)
      this.updateInputsValue(outputsArray)
    },
    uploadHandler() {
      // Change name of uploaded image
      Object.defineProperty(this.$refs.file.files[0], 'name', {
        writable: true,
        value: 'image',
      })
      this.fileName = this.$refs.file.files[0].name.split('.jpeg')[0]
      this.photoUrl.val = this.$refs.file.files[0]
      console.log(this.photoUrl.val)
      this.preview = URL.createObjectURL(this.photoUrl.val)
    },
    toggleType() {
      if (this.inputType === 'password') {
        this.inputType = 'text'
      } else {
        this.inputType = 'password'
      }
    },

    async submitMode() {
      if (this.mode === '1') {
        this.modeCaption = 'Continuar'
        // mode =2 ==> Entering fullname
        this.userInfo.set('email', this.email.val)
        this.userInfo.set('password', this.password.val)
        this.validationHandler(this.userInfo)
        if (this.formIsValid) {
          this.mode = '2'
        }
      } else {
        this.userInfo.set('fullname', this.fullname.val)
        await this.registerForm(this.userInfo)
      }
    },
    async registerForm(dataEntry) {
      this.validationHandler(dataEntry)

      if (this.formIsValid) {
        this.$router.push('/feed')
      } else {
        this.$refs.registerFrom.reset()
        console.log('form is not valid')
      }
    },

    updateInputsValue(inputs) {
      inputs.forEach((item) => {
        this[`${item.key}`].valid.isVal = item.isVal
        this[`${item.key}`].valid.errorMessage = item.errorMessage
      })
    },
    async createUser() {
      try {
        const user = {
          email: this.email,
          password: this.password,
          fullname: this.fullname
        }
        const res = await axios.post('http://localhost:3001/api/users', user)
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    }
  },
  computed: {
    displayType() {
      if (this.inputType === 'password') {
        return 'Show'
      } else {
        return 'hide'
      }
    },
  },
  created() {
    this.preview = localStorage.getItem('photoUrl')
  },
}
</script>

<style scoped>
.inputFile {
  overflow: hidden;
  z-index: -1;
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  display: none;
}

.inputFile + label {
  font-size: 1.2rem;
}
</style>
