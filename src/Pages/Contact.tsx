import { Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
export default function Contact() {
  const handleSubmit = (e:any) => {
    e.preventDefault()
  }
  return (
    <div className="bg-gray-100">
    <h1 className="text-center text-4xl uppercase font-semibold">Contact</h1>
    <div className="flex justify-center items-center h-screen bg-gray-100 px-6">
      
  <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <Input label="Nom" crossOrigin={true} className="rounded-half"/>
        </div>
        <div className="md:col-span-1">
          <Input label="Prénom" crossOrigin={true} className="rounded-half"/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <Input label="Email" crossOrigin={true} className="rounded-half"/>
        </div>
        <div className="md:col-span-1">
          <Input label="Téléphone" crossOrigin={true} className="rounded-half"/>
        </div>
      </div>
      <div>
        <Textarea label="Message"/>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Envoyer
        </button>
      </div>
    </form>
  </div>
</div>
</div>

  )
}
