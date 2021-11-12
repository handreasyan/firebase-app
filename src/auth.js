export function getAuthForm() {
  return `
         <form class="mui-form" id="auth-form">
         <div class="mui-textfield mui-textfield--float-label">
            <input type="email" required id="email" />
            <label for="email">Email</label>
         </div>
         <div class="mui-textfield mui-textfield--float-label">
         <input type="password" required id="password" />
         <label for="password">Password</label>
      </div>
         <button  id="sign-in" type="submit" class="mui-btn mui-btn--raised  mui-btn--primary"
         >
            Sign in
         </button>
      </form>
   `
}

export function authWithEmailAndPassword(email, password) {
  //  test@mail.ru
  //  tes11t@mail.ru
  const apiKey = 'AIzaSyAOpa5nMRmnPa2vsz9ZfJ-t7_VIdaqLeZ4'
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        'Content-type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.idToken)
}
