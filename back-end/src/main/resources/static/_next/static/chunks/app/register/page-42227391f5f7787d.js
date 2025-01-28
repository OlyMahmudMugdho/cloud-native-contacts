(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[454],{2520:(e,t,r)=>{Promise.resolve().then(r.bind(r,5659))},5659:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>g});var s=r(5155),a=r(2115),n=r(6046),o=r(9606),l=r(2679),i=r(3415),d=r(5848),c=r(8173),u=r.n(c),m=r(3312),p=r(9749),f=r(3886),x=r(3900),h=r(7223),N=r(5534),S=r(4474),v=r(1923);let T=i.Ik({username:i.Yj().min(2,"Username must be at least 2 characters"),name:i.Yj().min(2,"Name must be at least 2 characters"),email:i.Yj().email("Invalid email address"),password:i.Yj().min(6,"Password must be at least 6 characters")});function g(){let e=(0,n.useRouter)(),{toast:t}=(0,h.dj)(),{setAuth:r,isAuthenticated:i}=(0,S.n)();a.useEffect(()=>{if(i()){e.push(v.b.CONTACTS);return}},[i,e]);let c=(0,o.mN)({resolver:(0,l.u)(T),defaultValues:{username:"",name:"",email:"",password:""}}),g=(0,d.n)({mutationFn:N.kz,onSuccess:s=>{r(s.user,s.token),t({title:"Success",description:"Account created successfully."}),e.push(v.b.CONTACTS)},onError:e=>{var r,s;t({variant:"destructive",title:"Error",description:(null===(s=e.response)||void 0===s?void 0:null===(r=s.data)||void 0===r?void 0:r.message)||"Failed to create account."})}});return i()?null:(0,s.jsx)("div",{className:"flex items-center justify-center",children:(0,s.jsxs)(p.Zp,{className:"w-full max-w-[400px]",children:[(0,s.jsxs)(p.aR,{className:"space-y-1",children:[(0,s.jsx)(p.ZB,{className:"text-xl md:text-2xl text-center",children:"Create Account"}),(0,s.jsx)(p.BT,{className:"text-center",children:"Create an account to get started"})]}),(0,s.jsx)(p.Wu,{className:"p-4",children:(0,s.jsx)(f.lV,{...c,children:(0,s.jsxs)("form",{onSubmit:c.handleSubmit(e=>{g.mutate(e)}),className:"space-y-3",children:[(0,s.jsx)(f.zB,{control:c.control,name:"username",render:e=>{let{field:t}=e;return(0,s.jsxs)(f.eI,{children:[(0,s.jsx)(f.lR,{children:"Username"}),(0,s.jsx)(f.MJ,{children:(0,s.jsx)(x.p,{...t,className:"w-full"})}),(0,s.jsx)(f.C5,{})]})}}),(0,s.jsx)(f.zB,{control:c.control,name:"name",render:e=>{let{field:t}=e;return(0,s.jsxs)(f.eI,{children:[(0,s.jsx)(f.lR,{children:"Name"}),(0,s.jsx)(f.MJ,{children:(0,s.jsx)(x.p,{...t,className:"w-full"})}),(0,s.jsx)(f.C5,{})]})}}),(0,s.jsx)(f.zB,{control:c.control,name:"email",render:e=>{let{field:t}=e;return(0,s.jsxs)(f.eI,{children:[(0,s.jsx)(f.lR,{children:"Email"}),(0,s.jsx)(f.MJ,{children:(0,s.jsx)(x.p,{type:"email",...t,className:"w-full"})}),(0,s.jsx)(f.C5,{})]})}}),(0,s.jsx)(f.zB,{control:c.control,name:"password",render:e=>{let{field:t}=e;return(0,s.jsxs)(f.eI,{children:[(0,s.jsx)(f.lR,{children:"Password"}),(0,s.jsx)(f.MJ,{children:(0,s.jsx)(x.p,{type:"password",...t,className:"w-full"})}),(0,s.jsx)(f.C5,{})]})}}),(0,s.jsx)(m.$,{type:"submit",className:"w-full mt-4",disabled:g.isPending,children:g.isPending?"Creating Account...":"Create Account"})]})})}),(0,s.jsx)(p.wL,{className:"flex justify-center border-t px-4 py-4",children:(0,s.jsxs)("p",{className:"text-sm text-muted-foreground",children:["Already have an account?"," ",(0,s.jsx)(u(),{href:"/login",className:"text-primary hover:underline",children:"Login"})]})})]})})}},3312:(e,t,r)=>{"use strict";r.d(t,{$:()=>d,r:()=>i});var s=r(5155),a=r(2115),n=r(2317),o=r(1027),l=r(1567);let i=(0,o.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=a.forwardRef((e,t)=>{let{className:r,variant:a,size:o,asChild:d=!1,...c}=e,u=d?n.DX:"button";return(0,s.jsx)(u,{className:(0,l.cn)(i({variant:a,size:o,className:r})),ref:t,...c})});d.displayName="Button"},9749:(e,t,r)=>{"use strict";r.d(t,{BT:()=>d,Wu:()=>c,ZB:()=>i,Zp:()=>o,aR:()=>l,wL:()=>u});var s=r(5155),a=r(2115),n=r(1567);let o=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...a})});o.displayName="Card";let l=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",r),...a})});l.displayName="CardHeader";let i=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("h3",{ref:t,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",r),...a})});i.displayName="CardTitle";let d=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("p",{ref:t,className:(0,n.cn)("text-sm text-muted-foreground",r),...a})});d.displayName="CardDescription";let c=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("p-6 pt-0",r),...a})});c.displayName="CardContent";let u=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("flex items-center p-6 pt-0",r),...a})});u.displayName="CardFooter"},3886:(e,t,r)=>{"use strict";r.d(t,{lV:()=>u,MJ:()=>S,zB:()=>p,eI:()=>h,lR:()=>N,C5:()=>v});var s=r(5155),a=r(2115),n=r(2317),o=r(9606),l=r(1567),i=r(6195);let d=(0,r(1027).F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)(i.b,{ref:t,className:(0,l.cn)(d(),r),...a})});c.displayName=i.b.displayName;let u=o.Op,m=a.createContext({}),p=e=>{let{...t}=e;return(0,s.jsx)(m.Provider,{value:{name:t.name},children:(0,s.jsx)(o.xI,{...t})})},f=()=>{let e=a.useContext(m),t=a.useContext(x),{getFieldState:r,formState:s}=(0,o.xW)(),n=r(e.name,s);if(!e)throw Error("useFormField should be used within <FormField>");let{id:l}=t;return{id:l,name:e.name,formItemId:"".concat(l,"-form-item"),formDescriptionId:"".concat(l,"-form-item-description"),formMessageId:"".concat(l,"-form-item-message"),...n}},x=a.createContext({}),h=a.forwardRef((e,t)=>{let{className:r,...n}=e,o=a.useId();return(0,s.jsx)(x.Provider,{value:{id:o},children:(0,s.jsx)("div",{ref:t,className:(0,l.cn)("space-y-2",r),...n})})});h.displayName="FormItem";let N=a.forwardRef((e,t)=>{let{className:r,...a}=e,{error:n,formItemId:o}=f();return(0,s.jsx)(c,{ref:t,className:(0,l.cn)(n&&"text-destructive",r),htmlFor:o,...a})});N.displayName="FormLabel";let S=a.forwardRef((e,t)=>{let{...r}=e,{error:a,formItemId:o,formDescriptionId:l,formMessageId:i}=f();return(0,s.jsx)(n.DX,{ref:t,id:o,"aria-describedby":a?"".concat(l," ").concat(i):"".concat(l),"aria-invalid":!!a,...r})});S.displayName="FormControl",a.forwardRef((e,t)=>{let{className:r,...a}=e,{formDescriptionId:n}=f();return(0,s.jsx)("p",{ref:t,id:n,className:(0,l.cn)("text-[0.8rem] text-muted-foreground",r),...a})}).displayName="FormDescription";let v=a.forwardRef((e,t)=>{let{className:r,children:a,...n}=e,{error:o,formMessageId:i}=f(),d=o?String(null==o?void 0:o.message):a;return d?(0,s.jsx)("p",{ref:t,id:i,className:(0,l.cn)("text-[0.8rem] font-medium text-destructive",r),...n,children:d}):null});v.displayName="FormMessage"},3900:(e,t,r)=>{"use strict";r.d(t,{p:()=>o});var s=r(5155),a=r(2115),n=r(1567);let o=a.forwardRef((e,t)=>{let{className:r,type:a,...o}=e;return(0,s.jsx)("input",{type:a,className:(0,n.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...o})});o.displayName="Input"},7223:(e,t,r)=>{"use strict";r.d(t,{dj:()=>m});var s=r(2115);let a=0,n=new Map,o=e=>{if(n.has(e))return;let t=setTimeout(()=>{n.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);n.set(e,t)},l=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:r}=t;return r?o(r):e.toasts.forEach(e=>{o(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},i=[],d={toasts:[]};function c(e){d=l(d,e),i.forEach(e=>{e(d)})}function u(e){let{...t}=e,r=(a=(a+1)%Number.MAX_VALUE).toString(),s=()=>c({type:"DISMISS_TOAST",toastId:r});return c({type:"ADD_TOAST",toast:{...t,id:r,open:!0,onOpenChange:e=>{e||s()}}}),{id:r,dismiss:s,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:r}})}}function m(){let[e,t]=s.useState(d);return s.useEffect(()=>(i.push(t),()=>{let e=i.indexOf(t);e>-1&&i.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},5534:(e,t,r)=>{"use strict";r.d(t,{BD:()=>N,CI:()=>m,MO:()=>p,VG:()=>h,XY:()=>x,bl:()=>c,iD:()=>l,kK:()=>d,kz:()=>i,r7:()=>f,vY:()=>u,xw:()=>S});var s=r(2651),a=r(4474),n=r(1923);let o=s.A.create({baseURL:"".concat(n.n.BASE_URL).concat(n.n.ENDPOINTS.BASE),headers:{"Content-Type":"application/json"}});o.interceptors.request.use(e=>{let t=a.n.getState().token;return t&&(e.headers.Authorization="Bearer ".concat(t)),e}),o.interceptors.response.use(e=>e,e=>{var t,r;return((null===(t=e.response)||void 0===t?void 0:t.status)===401||(null===(r=e.response)||void 0===r?void 0:r.status)===403)&&(a.n.getState().clearAuth(),window.location.pathname.includes("/login")||(window.location.href="/login")),Promise.reject(e)});let l=async e=>(await o.post(n.n.ENDPOINTS.AUTH.LOGIN,e)).data,i=async e=>(await o.post(n.n.ENDPOINTS.AUTH.REGISTER,e)).data,d=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return(await o.get(n.n.ENDPOINTS.CONTACTS,{params:{page:e,size:t}})).data},c=async e=>(await o.get("".concat(n.n.ENDPOINTS.CONTACTS,"/").concat(e))).data,u=async e=>(await o.post(n.n.ENDPOINTS.CONTACTS,e)).data,m=async(e,t)=>(await o.put("".concat(n.n.ENDPOINTS.CONTACTS,"/").concat(e),t)).data,p=async e=>{await o.delete("".concat(n.n.ENDPOINTS.CONTACTS,"/").concat(e))},f=async e=>(await o.put(n.n.ENDPOINTS.USERS.ME,e)).data,x=async e=>{let t=new FormData;return t.append("file",e),(await o.put(n.n.ENDPOINTS.USERS.PHOTO,t,{headers:{"Content-Type":"multipart/form-data"}})).data},h=e=>{if(e)return e.startsWith("http")?e:"".concat(n.n.BASE_URL).concat(e)},N=async e=>{await o.post(n.n.ENDPOINTS.AUTH.FORGOT_PASSWORD,e)},S=async e=>{await o.post(n.n.ENDPOINTS.AUTH.RESET_PASSWORD,e)}},1923:(e,t,r)=>{"use strict";r.d(t,{b:()=>s,n:()=>a});let s={HOME:"/",LOGIN:"/login",REGISTER:"/register",PROFILE:"/profile",CONTACTS:"/contacts",FORGOT_PASSWORD:"/forgot-password",RESET_PASSWORD:"/reset-password"},a={BASE_URL:"",ENDPOINTS:{BASE:"/api/v1",AUTH:{LOGIN:"/auth/login",REGISTER:"/auth/register",FORGOT_PASSWORD:"/auth/forgot-password",RESET_PASSWORD:"/auth/reset-password"},USERS:{ME:"/users/me",PHOTO:"/users/me/photo"},CONTACTS:"/contacts"}}},1567:(e,t,r)=>{"use strict";r.d(t,{cn:()=>n});var s=r(3463),a=r(9795);function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.QP)((0,s.$)(t))}},4474:(e,t,r)=>{"use strict";r.d(t,{n:()=>n});var s=r(9827),a=r(709);let n=(0,s.v)()((0,a.Zr)((e,t)=>({token:null,user:null,setAuth:(t,r)=>e({token:r,user:t}),clearAuth:()=>e({token:null,user:null}),isAuthenticated:()=>{let e=t();return!!(e.token&&e.user)}}),{name:"auth-storage",partialize:e=>({token:e.token,user:e.user})}))}},e=>{var t=t=>e(e.s=t);e.O(0,[208,179,173,441,517,358],()=>t(2520)),_N_E=e.O()}]);