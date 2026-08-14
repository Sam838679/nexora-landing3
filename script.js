// =====================================
// NEXORA NEWS - LANDING PAGE
// =====================================

async function loadHomeNews() {
    console.log("NEXORA NEWS: bắt đầu tải");
console.log("supabaseClient:", supabaseClient);

    const newsList =
        document.querySelector("#home-news-list");

    if (!newsList) return;


    const {
        data: posts,
        error
    } = await supabaseClient
        .from("posts")
        .select(
            "id, title, slug, category, excerpt, image_url, created_at, status"
        )
        .eq("status", "published")
        .order("created_at", {
            ascending: false
        })
        .limit(3);


    if (error) {

        console.error(
            "Không thể tải tin tức:",
            error
        );

        newsList.innerHTML = `
            <div class="news-loading">
                Không thể tải tin tức.
            </div>
        `;

        return;
    }


    if (!posts || posts.length === 0) {

        newsList.innerHTML = `
            <div class="news-loading">
                Chưa có bài viết nào.
            </div>
        `;

        return;
    }


    newsList.innerHTML =
        posts.map(function(post) {

            const image =
                post.image_url ||
                "assets/nexora-bg.png";


            const date =
                post.created_at
                    ? new Date(
                        post.created_at
                    ).toLocaleDateString("vi-VN")
                    : "";


            return `
                <article class="news-card">

                    <a
                        href="news/article.html?slug=${encodeURIComponent(post.slug)}"
                    >

                        <div class="news-image">

                            <img
                                src="${image}"
                                alt="${post.title}"
                            >

                        </div>

                    </a>


                    <div class="news-card-content">

                        <div class="category">
                            ${post.category || "NEXORA"}
                        </div>

                        <div class="article-meta">
                            ${date}
                        </div>


                        <h3>

                            <a
                                href="news/article.html?slug=${encodeURIComponent(post.slug)}"
                            >
                                ${post.title}
                            </a>

                        </h3>


                        <p>
                            ${post.excerpt || ""}
                        </p>


                        <a
                            href="news/article.html?slug=${encodeURIComponent(post.slug)}"
                        >
                            Đọc bài viết →
                        </a>

                    </div>

                </article>
            `;

        }).join("");

}


loadHomeNews();