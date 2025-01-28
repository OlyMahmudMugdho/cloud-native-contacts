(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[162],{3924:(e,t,r)=>{Promise.resolve().then(r.bind(r,4077))},4077:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>v});var s=r(5155);r(2115);var a=r(6046),n=r(9606),o=r(2679),i=r(3415),l=r(5848),d=r(8173),c=r.n(d),u=r(3312),m=r(9749),p=r(3886),f=r(3900),x=r(7223),h=r(5534),N=r(1923);let S=i.Ik({email:i.Yj().email("Please enter a valid email address")});function v(){let e=(0,a.useRouter)(),{toast:t}=(0,x.dj)(),r=(0,n.mN)({resolver:(0,o.u)(S),defaultValues:{email:""}}),i=(0,l.n)({mutationFn:h.BD,onSuccess:()=>{t({title:"Success",description:"If an account exists with this email, you will receive password reset instructions."}),e.push(N.b.LOGIN)},onError:e=>{var r,s;t({variant:"destructive",title:"Error",description:(null===(s=e.response)||void 0===s?void 0:null===(r=s.data)||void 0===r?void 0:r.message)||"Something went wrong. Please try again."})}});return(0,s.jsx)("div",{className:"flex items-center justify-center p-4",children:(0,s.jsxs)(m.Zp,{className:"w-full max-w-[400px]",children:[(0,s.jsxs)(m.aR,{className:"space-y-1",children:[(0,s.jsx)(m.ZB,{className:"text-xl md:text-2xl text-center",children:"Forgot Password"}),(0,s.jsx)(m.BT,{className:"text-center",children:"Enter your email address and we'll send you instructions to reset your password"})]}),(0,s.jsx)(m.Wu,{className:"p-4",children:(0,s.jsx)(p.lV,{...r,children:(0,s.jsxs)("form",{onSubmit:r.handleSubmit(e=>{i.mutate(e)}),className:"space-y-3",children:[(0,s.jsx)(p.zB,{control:r.control,name:"email",render:e=>{let{field:t}=e;return(0,s.jsxs)(p.eI,{children:[(0,s.jsx)(p.lR,{children:"Email"}),(0,s.jsx)(p.MJ,{children:(0,s.jsx)(f.p,{type:"email",...t,className:"w-full"})}),(0,s.jsx)(p.C5,{})]})}}),(0,s.jsx)(u.$,{type:"submit",className:"w-full mt-4",disabled:i.isPending,children:i.isPending?"Sending...":"Send Reset Instructions"})]})})}),(0,s.jsxs)(m.wL,{className:"flex flex-col space-y-2 text-center border-t px-4 py-4",children:[(0,s.jsxs)("p",{className:"text-sm text-muted-foreground",children:["Remember your password?"," ",(0,s.jsx)(c(),{href:"/login",className:"text-primary hover:underline",children:"Login"})]}),(0,s.jsxs)("p",{className:"text-sm text-muted-foreground",children:["Already have a reset token?"," ",(0,s.jsx)(c(),{href:N.b.RESET_PASSWORD,className:"text-primary hover:underline",children:"Reset your password"})]})]})]})})}},3312:(e,t,r)=>{"use strict";r.d(t,{$:()=>d,r:()=>l});var s=r(5155),a=r(2115),n=r(2317),o=r(1027),i=r(1567);let l=(0,o.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=a.forwardRef((e,t)=>{let{className:r,variant:a,size:o,asChild:d=!1,...c}=e,u=d?n.DX:"button";return(0,s.jsx)(u,{className:(0,i.cn)(l({variant:a,size:o,className:r})),ref:t,...c})});d.displayName="Button"},9749:(e,t,r)=>{"use strict";r.d(t,{BT:()=>d,Wu:()=>c,ZB:()=>l,Zp:()=>o,aR:()=>i,wL:()=>u});var s=r(5155),a=r(2115),n=r(1567);let o=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...a})});o.displayName="Card";let i=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",r),...a})});i.displayName="CardHeader";let l=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("h3",{ref:t,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",r),...a})});l.displayName="CardTitle";let d=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("p",{ref:t,className:(0,n.cn)("text-sm text-muted-foreground",r),...a})});d.displayName="CardDescription";let c=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("p-6 pt-0",r),...a})});c.displayName="CardContent";let u=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("flex items-center p-6 pt-0",r),...a})});u.displayName="CardFooter"},3886:(e,t,r)=>{"use strict";r.d(t,{lV:()=>u,MJ:()=>S,zB:()=>p,eI:()=>h,lR:()=>N,C5:()=>v});var s=r(5155),a=r(2115),n=r(2317),o=r(9606),i=r(1567),l=r(6195);let d=(0,r(1027).F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)(l.b,{ref:t,className:(0,i.cn)(d(),r),...a})});c.displayName=l.b.displayName;let u=o.Op,m=a.createContext({}),p=e=>{let{...t}=e;return(0,s.jsx)(m.Provider,{value:{name:t.name},children:(0,s.jsx)(o.xI,{...t})})},f=()=>{let e=a.useContext(m),t=a.useContext(x),{getFieldState:r,formState:s}=(0,o.xW)(),n=r(e.name,s);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=t;return{id:i,name:e.name,formItemId:"".concat(i,"-form-item"),formDescriptionId:"".concat(i,"-form-item-description"),formMessageId:"".concat(i,"-form-item-message"),...n}},x=a.createContext({}),h=a.forwardRef((e,t)=>{let{className:r,...n}=e,o=a.useId();return(0,s.jsx)(x.Provider,{value:{id:o},children:(0,s.jsx)("div",{ref:t,className:(0,i.cn)("space-y-2",r),...n})})});h.displayName="FormItem";let N=a.forwardRef((e,t)=>{let{className:r,...a}=e,{error:n,formItemId:o}=f();return(0,s.jsx)(c,{ref:t,className:(0,i.cn)(n&&"text-destructive",r),htmlFor:o,...a})});N.displayName="FormLabel";let S=a.forwardRef((e,t)=>{let{...r}=e,{error:a,formItemId:o,formDescriptionId:i,formMessageId:l}=f();return(0,s.jsx)(n.DX,{ref:t,id:o,"aria-describedby":a?"".concat(i," ").concat(l):"".concat(i),"aria-invalid":!!a,...r})});S.displayName="FormControl",a.forwardRef((e,t)=>{let{className:r,...a}=e,{formDescriptionId:n}=f();return(0,s.jsx)("p",{ref:t,id:n,className:(0,i.cn)("text-[0.8rem] text-muted-foreground",r),...a})}).displayName="FormDescription";let v=a.forwardRef((e,t)=>{let{className:r,children:a,...n}=e,{error:o,formMessageId:l}=f(),d=o?String(null==o?void 0:o.message):a;return d?(0,s.jsx)("p",{ref:t,id:l,className:(0,i.cn)("text-[0.8rem] font-medium text-destructive",r),...n,children:d}):null});v.displayName="FormMessage"},3900:(e,t,r)=>{"use strict";r.d(t,{p:()=>o});var s=r(5155),a=r(2115),n=r(1567);let o=a.forwardRef((e,t)=>{let{className:r,type:a,...o}=e;return(0,s.jsx)("input",{type:a,className:(0,n.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...o})});o.displayName="Input"},7223:(e,t,r)=>{"use strict";r.d(t,{dj:()=>m});var s=r(2115);let a=0,n=new Map,o=e=>{if(n.has(e))return;let t=setTimeout(()=>{n.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);n.set(e,t)},i=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:r}=t;return r?o(r):e.toasts.forEach(e=>{o(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},l=[],d={toasts:[]};function c(e){d=i(d,e),l.forEach(e=>{e(d)})}function u(e){let{...t}=e,r=(a=(a+1)%Number.MAX_VALUE).toString(),s=()=>c({type:"DISMISS_TOAST",toastId:r});return c({type:"ADD_TOAST",toast:{...t,id:r,open:!0,onOpenChange:e=>{e||s()}}}),{id:r,dismiss:s,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:r}})}}function m(){let[e,t]=s.useState(d);return s.useEffect(()=>(l.push(t),()=>{let e=l.indexOf(t);e>-1&&l.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},5534:(e,t,r)=>{"use strict";r.d(t,{BD:()=>N,CI:()=>m,MO:()=>p,VG:()=>h,XY:()=>x,bl:()=>c,iD:()=>i,kK:()=>d,kz:()=>l,r7:()=>f,vY:()=>u,xw:()=>S});var s=r(2651),a=r(4474),n=r(1923);let o=s.A.create({baseURL:"".concat(n.n.BASE_URL).concat(n.n.ENDPOINTS.BASE),headers:{"Content-Type":"application/json"}});o.interceptors.request.use(e=>{let t=a.n.getState().token;return t&&(e.headers.Authorization="Bearer ".concat(t)),e}),o.interceptors.response.use(e=>e,e=>{var t,r;return((null===(t=e.response)||void 0===t?void 0:t.status)===401||(null===(r=e.response)||void 0===r?void 0:r.status)===403)&&(a.n.getState().clearAuth(),window.location.pathname.includes("/login")||(window.location.href="/login")),Promise.reject(e)});let i=async e=>(await o.post(n.n.ENDPOINTS.AUTH.LOGIN,e)).data,l=async e=>(await o.post(n.n.ENDPOINTS.AUTH.REGISTER,e)).data,d=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return(await o.get(n.n.ENDPOINTS.CONTACTS,{params:{page:e,size:t}})).data},c=async e=>(await o.get("".concat(n.n.ENDPOINTS.CONTACTS,"/").concat(e))).data,u=async e=>(await o.post(n.n.ENDPOINTS.CONTACTS,e)).data,m=async(e,t)=>(await o.put("".concat(n.n.ENDPOINTS.CONTACTS,"/").concat(e),t)).data,p=async e=>{await o.delete("".concat(n.n.ENDPOINTS.CONTACTS,"/").concat(e))},f=async e=>(await o.put(n.n.ENDPOINTS.USERS.ME,e)).data,x=async e=>{let t=new FormData;return t.append("file",e),(await o.put(n.n.ENDPOINTS.USERS.PHOTO,t,{headers:{"Content-Type":"multipart/form-data"}})).data},h=e=>{if(e)return e.startsWith("http")?e:"".concat(n.n.BASE_URL).concat(e)},N=async e=>{await o.post(n.n.ENDPOINTS.AUTH.FORGOT_PASSWORD,e)},S=async e=>{await o.post(n.n.ENDPOINTS.AUTH.RESET_PASSWORD,e)}},1923:(e,t,r)=>{"use strict";r.d(t,{b:()=>s,n:()=>a});let s={HOME:"/",LOGIN:"/login",REGISTER:"/register",PROFILE:"/profile",CONTACTS:"/contacts",FORGOT_PASSWORD:"/forgot-password",RESET_PASSWORD:"/reset-password"},a={BASE_URL:"",ENDPOINTS:{BASE:"/api/v1",AUTH:{LOGIN:"/auth/login",REGISTER:"/auth/register",FORGOT_PASSWORD:"/auth/forgot-password",RESET_PASSWORD:"/auth/reset-password"},USERS:{ME:"/users/me",PHOTO:"/users/me/photo"},CONTACTS:"/contacts"}}},1567:(e,t,r)=>{"use strict";r.d(t,{cn:()=>n});var s=r(3463),a=r(9795);function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.QP)((0,s.$)(t))}},4474:(e,t,r)=>{"use strict";r.d(t,{n:()=>n});var s=r(9827),a=r(709);let n=(0,s.v)()((0,a.Zr)((e,t)=>({token:null,user:null,setAuth:(t,r)=>e({token:r,user:t}),clearAuth:()=>e({token:null,user:null}),isAuthenticated:()=>{let e=t();return!!(e.token&&e.user)}}),{name:"auth-storage",partialize:e=>({token:e.token,user:e.user})}))}},e=>{var t=t=>e(e.s=t);e.O(0,[208,179,173,441,517,358],()=>t(3924)),_N_E=e.O()}]);