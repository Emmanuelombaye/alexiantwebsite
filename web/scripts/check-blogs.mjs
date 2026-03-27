import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://chdpzfeuxcphzpyahrlh.supabase.co";
const supabaseKey = "sb_publishable_th7FBWaXXF80NXaxfeUs0g_RETqK590";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBlogs() {
  const { data, error } = await supabase.from("blog_posts").select("*");
  if (error) {
    console.error("Error fetching blogs:", error);
  } else {
    console.log(`Found ${data.length} blogs in DB:`);
    console.log(JSON.stringify(data.map(b => ({ id: b.id, title: b.title, slug: b.slug, published: b.published })), null, 2));
  }
}

checkBlogs();
