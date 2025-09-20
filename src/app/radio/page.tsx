export const dynamic = 'force-dynamic';
import { unstable_noStore } from 'next/cache';

import { query } from "../lib/db";
import Radio from "./Radio";

export default async function page(){
      unstable_noStore(); // disables caching for this request

//       const info = await query(`
//   SELECT current_database(), inet_server_addr(), inet_server_port()
// `);
// console.log("DB Info:", info);


          const stations=await query(`select * from radio where approved='y' 
            order by priority`);
        
        return  <Radio stations={stations}/>
}