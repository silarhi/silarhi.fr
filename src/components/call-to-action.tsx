import Button from '@/components/ui/button'

export default function CallToAction() {
    return (
        <div className="py-5 text-center">
            <Button href="/contact" as="a" size="lg" variant="primary" className="px-16 py-4 text-2xl">
                Demander un devis
            </Button>
        </div>
    )
}
