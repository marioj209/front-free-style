import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: "¿Poseen tienda fisica?",
    answer:
      "No, somos una tienda virtual especializada en indumentaria y accesorios ",
  },
  {
    question: "¿Cómo se realiza el pago?",
    answer:
      "El pago se realiza mediante la plataforma MercadoPago, ya sea por tarjeta de crédito o débito ",
  },
  {
    question: "¿Cómo me puedo registrar?",
    answer:
      "Se realiza llenando el formulario con los datos solicitados en la sección de registro, luego debe iniciar sesión con su email y contraseña",
  },
  {
    question: "¿Cuál es el costo del envío?",
    answer:
      " El envío es totalmente gratis",
  },
  {
    question: "¿Cuál es el tiempo estimado de espera para recibir mi pedido?",
    answer:
      "El tiempo de entrega es de 2 a 3 días hábiles",
  },
  {
    question: "¿Hacen envios a todo el país?",
    answer:
      "Sí, los envios son a nivel nacional",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FAQ() {
  return (
    <div className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Preguntas más frecuentes</h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-400">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-800">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}