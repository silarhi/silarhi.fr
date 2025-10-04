import CallToActionButton from '@/components/CallToActionButton'

export default function CallToAction() {
    return (
        <div className={'text-center py-5'}>
            <CallToActionButton size={'lg'} variant="primary" className="px-16 py-4 text-2xl">
                Demander un devis
            </CallToActionButton>
        </div>
    )
}
