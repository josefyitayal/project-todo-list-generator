
async function ProjectIdPage({ params }) {
    const { projectId } = await params

    return (
        <div>
            {projectId}
        </div>
    )
}

export default ProjectIdPage
