import { useLoaderData } from "react-router-dom";
import Blog from "../components/Blog";
import auth from "../firebase/firebase.init";


export default function Blogs() {
    const blogs = useLoaderData()
    console.log(blogs)

    const handleBlogPost = (e) => {
        e.preventDefault()
        const date = auth.currentUser?.metadata?.lastSignInTime
        const form = new FormData(e.currentTarget)
        const title = form.get('title')
        const image = form.get('image')
        const description = form.get('description')
        const blog = { title, image, description, date }

        fetch('http://localhost:5000/addblog', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (<>
        <h2 className="text-center text-3xl text-[#70D2C0] my-10">Latest News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
            {
                blogs.map(blog => <Blog key={blog._id} blog={blog}></Blog>)
            }
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box ">
                <h3 className="font-bold text-lg mb-5 text-center">New Blog</h3>
                <form onSubmit={handleBlogPost}>
                    <label className="input input-bordered flex items-center gap-2 my-8">
                        Title
                        <input name="title" type="text" className="grow" placeholder="title" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-8">
                        Image URL
                        <input name="image" type="text" className="grow" placeholder="http://blogsimg.jpg" />
                    </label>
                    <label className=" flex items-center gap-2">
                        <textarea name="description" className="textarea textarea-primary w-full" placeholder="Description"></textarea>
                    </label>
                    <input className="btn btn-primary my-5 px-6" type="submit" value="Post" />
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-outline btn-info block mx-auto">Add New Blog</button>
    </>)
}
