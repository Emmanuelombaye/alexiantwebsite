import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://chdpzfeuxcphzpyahrlh.supabase.co";
const supabaseKey = "sb_publishable_th7FBWaXXF80NXaxfeUs0g_RETqK590";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log("Attempting to insert a test blog using the Anon Key...");

  // Match the SupabaseBlogRow schema from service.ts
  const dummyPost = {
    slug: "test-auth-" + Date.now(),
    title: "Test Auth Post",
    excerpt: "Testing database access permissions.",
    content: "If this works, RLS is disabled.",
    author: "System",
    category: "Test",
    date: new Date().toISOString(),
    image: "",
    published: false
  };

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(dummyPost)
    .select()
    .single();

  if (error) {
    console.error("\n❌ FAILED TO INSERT!");
    console.error("Error Details:", JSON.stringify(error, null, 2));
    console.log("\n💡 DIAGNOSIS: The database rejected the insert. This means your Supabase 'blog_posts' table has Row Level Security (RLS) enabled, which prevents public/anonymous users from creating new entries. Because your '.env.local' is missing the 'SUPABASE_SERVICE_ROLE_KEY', the website tries to save blogs as an anonymous user, fails, and silently stores the blog in temporary memory instead.");
  } else {
    console.log("\n✅ SUCCESSFULLY INSERTED!");
    console.log(data);
    
    // Clean up
    await supabase.from("blog_posts").delete().eq("id", data.id);
  }
}

testInsert();
