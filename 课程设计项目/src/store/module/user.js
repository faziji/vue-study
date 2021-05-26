import { setToken } from '@/lib/util'
import { login,authorization } from '@/api/index'


const state = {
	userName:  'Tom'
}

const mutations = {
	SET_USER_NAME (state, params) {
		state.userName = params
	},
	SET_RULES (state, rules) {
		state.rules = rules
	}
}	

const actions = {
	// updateUserName ({commit,state,rootState,dispatch})
	login({commit},{userName,password}) {
		return new Promise((resolve,reject)=>{
			login({userName,password}).then(res=>{
				// console.log(res)
				if (res.code === 200 && res.data.token) {
					setToken(res.data.token)
					resolve()
				} else {
					reject(new Error('错误'))
				}
			}).catch(error=>{
				// 401
				reject(error)
			})
		})
	},
	authorization({commit}) {
		return new Promise((resolve,reject)=>{
			authorization().then(res=>{
				// console.log(res)
				if (parseInt(res.code) === 401) reject(new Error('token error'))
				else {
					console.log(res)
					setToken(res.data.token)
					resolve(res.data.rules.page)
          			commit('SET_RULES', res.data.rules.component)
				}
			})
		})
	},
	logout () {
		setToken('')
	}
}

export default {
    state,
    mutations,
    actions
}