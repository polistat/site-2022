import { Octokit } from "@octokit/rest"  

export const octokit = new Octokit({     
  auth: process.env.NEXT_PUBLIC_GH_TOKEN,    
  userAgent: 'polistat-site-2022 v1' 
});