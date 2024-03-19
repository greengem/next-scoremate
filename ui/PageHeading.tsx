export default function PageHeading({ title } : { title: string }) {
    return <h1 className="text-4xl/tight font-semibold tracking-tight block mb-5">{title}</h1>
}